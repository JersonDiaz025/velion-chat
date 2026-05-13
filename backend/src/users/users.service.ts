import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { getAvatarData } from '../utils/avatar-generator';
import { STATUS_FRIENDS_REQ } from '../constants/status-friends-req';
import { FriendStatus } from '@prisma/client';
import { mapUserToProfile } from '../utils/user.mapper';
import { PresenceService } from '../presence/presence.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationLabels, NotificationType } from '../constants/notifications.constans';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private presenceService: PresenceService,
    private notificationsService: NotificationsService
  ) {}

  // Create a new user with hashed password and avatar data
  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOneUser(createUserDto.email, createUserDto.username);

      if (existingUser && existingUser.deletedAt) {
        throw new BadRequestException(
          'Este correo pertenece a una cuenta desactivada. ¿Deseas reactivarla?'
        );
      }

      if (existingUser) {
        throw new BadRequestException('El usuario o email ya existe.');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const avatarData = getAvatarData(createUserDto.name || createUserDto.username);

      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          avatarColor: avatarData?.color,
          initials: avatarData?.initials,
        },
      });

      if (newUser) {
        await this.notificationsService.notifyAll({
          title: NotificationLabels[NotificationType.USER_JOINED],
          body: `${newUser.name || newUser.username} se ha unido a Velion.`,
          type: NotificationType.USER_JOINED,
          metadata: {
            userId: newUser.id,
            name: newUser.name,
            initials: newUser.initials,
            username: newUser.username,
          },
        });
      }

      return {
        id: newUser.id,
        name: newUser.name,
        message: `Hola ${
          newUser.name ? newUser.name : newUser.username
        }, has sido registrado exitosamente.`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getUserById(userId: string, isFull = false) {
    try {
      const user = await this.prisma.extended.user.findUnique({
        where: { id: userId },
        include: isFull
          ? {
              _count: {
                select: {
                  messages: true,
                  chats: true,
                  sentRequests: { where: { status: FriendStatus.ACCEPTED } },
                  receivedRequests: { where: { status: FriendStatus.ACCEPTED } },
                },
              },
            }
          : undefined,
      });

      if (!user) throw new NotFoundException('Usuario no encontrado');

      // 1. Info básica agrupada
      const status = user && this.presenceService.isOnline(user?.id);

      const profile = mapUserToProfile(user);
      profile.status = status;

      if (!isFull) return profile;

      const fullUser = user as any;

      // 2. Reutilizamos tu método existente para obtener amigos
      const friends = await this.getFriendsUsers(userId);
      const totalFriends =
        (fullUser._count?.sentRequests || 0) + (fullUser._count?.receivedRequests || 0);

      // 3. Formateamos conexiones para el front (status e info extra)
      const connections = friends.map((friend) => ({
        ...friend,
        status: this.presenceService.isOnline(friend.id),
      }));

      return {
        profile,
        connections,
        stats: [
          { label: 'Mensajes', value: fullUser._count?.messages.toLocaleString() || '0' },
          { label: 'Conexiones', value: totalFriends.toLocaleString() },
          { label: 'Chats Activos', value: fullUser._count?.chats.toLocaleString() || '0' },
        ],
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Server Error'
      );
    }
  }

  async findOneUser(email: string, username?: string) {
    try {
      const user = await this.prisma.extended.user.findFirst({
        where: {
          OR: [{ email: email }, { username: username }],
        },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException(error.message);
    }
  }

  // Update user
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    let extraData = {};
    const dataUpdated = updateUserDto.name || updateUserDto.username;
    if (dataUpdated) {
      const avatarData = getAvatarData(dataUpdated);
      extraData = {
        initials: avatarData?.initials,
        avatarColor: avatarData?.color,
      };
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        ...extraData,
      },
    });
  }

  // Find user by param
  async findAllUsers(query: string = '', currentUserId: string) {
    // 1. Buscamos los usuarios
    const users = await this.prisma.extended.user.findMany({
      where: {
        id: { not: currentUserId },
        // Filtro: Solo usuarios que NO tengan una solicitud de amistad activa contigo
        // (ajusta los nombres de las relaciones según tu esquema de Prisma)
        sentRequests: {
          none: {
            OR: [{ receiverId: currentUserId }, { senderId: currentUserId }],
          },
        },
        receivedRequests: {
          none: {
            OR: [{ receiverId: currentUserId }, { senderId: currentUserId }],
          },
        },
        // Tu lógica de búsqueda original
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
        deletedAt: null, // Asegúrate de que no estén borrados
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true,
        avatarColor: true,
        initials: true,
      },
    });

    // 2. Mapeamos cada usuario individualmente para la fecha y presencia
    const formatter = new Intl.DateTimeFormat('es-DO', {
      month: 'long',
      year: 'numeric',
    });

    return users.map((u) => ({
      ...u,
      memberSince: u.createdAt ? formatter.format(new Date(u.createdAt)) : 'Reciente',
      status: this.presenceService.isOnline(u.id),
      isActive: this.presenceService.isOnline(u.id),
    }));
  }
  // Delete user
  async remove(id: string) {
    return await this.prisma.extended.user.delete({
      where: { id },
    });
  }

  // Send friend request
  async sendFriendRequestUser(senderId: string, receiverId: string) {
    if (senderId === receiverId) throw new BadRequestException('No puedes agregarte a ti mismo');

    const request = await this.prisma.friend.create({
      data: {
        senderId,
        receiverId,
        status: STATUS_FRIENDS_REQ.PENDING,
      },
      include: { sender: true },
    });

    if (request) {
      await this.notificationsService.notify({
        userId: receiverId,
        title: NotificationLabels[NotificationType.FRIEND_REQUEST],
        body: `${request.sender.name || request.sender.username} quiere ser tu amigo.`,
        type: NotificationType.FRIEND_REQUEST,
        metadata: {
          id: senderId,
          name: request.sender.name,
          username: request.sender.username,
          initials: request.sender.initials,
        },
      });
    }

    return request;
  }

  // Aceptar/Rechazar/Bloquear solicitud
  async updateFriendStatusUser(senderId: string, receiverId: string, status: FriendStatus) {
    const friendship = await this.prisma.friend.update({
      where: {
        senderId_receiverId: { senderId, receiverId },
      },
      data: { status },
      include: { receiver: true },
    });

    // Si la aceptó, notificamos al que envió la solicitud originalmente (senderId)
    if (status === STATUS_FRIENDS_REQ.ACCEPTED) {
      await this.notificationsService.notify({
        userId: senderId,
        title: NotificationLabels[NotificationType.FRIEND_ACCEPTED],
        body: `${friendship.receiver.name || friendship.receiver.username} aceptó tu solicitud de amistad.`,
        type: NotificationType.FRIEND_ACCEPTED,
        metadata: {
          friendId: receiverId,
          name: friendship.receiver.name,
          username: friendship.receiver.username,
          initials: friendship.receiver.initials,
        },
      });
    } else if (status === STATUS_FRIENDS_REQ.REJECTED) {
      await this.notificationsService.notify({
        userId: senderId,
        title: 'Solicitud de amistad',
        body: `${friendship.receiver.name || friendship.receiver.username} ha declinado tu solicitud por ahora.`,
        type: NotificationType.REJECTED,
        metadata: {
          friendId: receiverId,
          name: friendship.receiver.name,
          username: friendship.receiver.username,
          initials: friendship.receiver.initials,
        },
      });
    }

    return friendship;
  }

  // Obtener amigos del usuario
  // En UsersService
  async getFriendsUsers(userId: string) {
    const friendships = await this.prisma.friend.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
        status: FriendStatus.ACCEPTED,
      },
      include: {
        sender: {
          select: { id: true, username: true, name: true, avatarColor: true, initials: true },
        },
        receiver: {
          select: { id: true, username: true, name: true, avatarColor: true, initials: true },
        },
      },
    });

    return friendships.map((f) => (f.senderId === userId ? f.receiver : f.sender));
  }
}
