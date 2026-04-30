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

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private presenceService: PresenceService
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

  // Get profile of the authenticated user
  //   async getUserById(userId: number, issFull = false) {
  //     try {
  //       const user = await this.prisma.user.findFirst({
  //         where: { id: userId },
  //       });
  //       if (!user) {
  //         throw new NotFoundException('Usuario no encontrado');
  //       }
  //       const { password, ...result } = user;
  //       return result;
  //     } catch (error) {
  //       if (error instanceof NotFoundException) throw new NotFoundException(error.message);
  //       if (error instanceof Error) throw new InternalServerErrorException(error.message);
  //     }
  //   }
  //   async getUserById(userId: number, isFull = false) {
  //     try {
  //       const user = await this.prisma.user.findUnique({
  //         where: { id: userId },
  //         include: isFull
  //           ? {
  //               sentRequests: { where: { status: 'ACCEPTED' }, include: { receiver: true } },
  //               receivedRequests: { where: { status: 'ACCEPTED' }, include: { sender: true } },
  //               _count: {
  //                 select: {
  //                   messages: true,
  //                   chats: true,
  //                   sentRequests: { where: { status: 'ACCEPTED' } },
  //                   receivedRequests: { where: { status: 'ACCEPTED' } },
  //                 },
  //               },
  //             }
  //           : undefined,
  //       });

  //       if (!user) throw new NotFoundException('Usuario no encontrado');

  //       const { password, ...result } = user;

  //       // Si no es full, retornamos el tipo básico inmediatamente
  //       if (!isFull) return result;

  //       // --- AQUÍ ESTÁ EL TRUCO PARA TYPESCRIPT ---
  //       // Forzamos a TS a tratar a 'user' como el tipo con relaciones solo en este bloque
  //       const fullUser = user as any;

  //       const totalFriends =
  //         (fullUser._count?.sentRequests || 0) + (fullUser._count?.receivedRequests || 0);

  //       const connections = [
  //         ...(fullUser.sentRequests?.map((req: any) => ({
  //           id: req.receiver.id,
  //           name: req.receiver.name || req.receiver.username,
  //           status: 'online',
  //           lastSeen: 'Online',
  //         })) || []),
  //         ...(fullUser.receivedRequests?.map((req: any) => ({
  //           id: req.sender.id,
  //           name: req.sender.name || req.sender.username,
  //           status: 'online',
  //           lastSeen: 'Online',
  //         })) || []),
  //       ];

  //       return {
  //         ...result,
  //         bio: 'Software Artisan Apprentice.',
  //         stats: [
  //           { label: 'Mensajes', value: fullUser._count?.messages.toLocaleString() || '0' },
  //           { label: 'Conexiones', value: totalFriends.toLocaleString() },
  //           { label: 'Chats Activos', value: fullUser._count?.chats.toLocaleString() || '0' },
  //         ],
  //         connections,
  //       };
  //     } catch (error) {
  //       if (error instanceof NotFoundException) throw error;
  //       throw new InternalServerErrorException(
  //         error instanceof Error ? error.message : 'Server Error'
  //       );
  //     }
  //   }

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
      const profile = mapUserToProfile(user);

      if (!isFull) return profile;

      const fullUser = user as any;

      // 2. Reutilizamos tu método existente para obtener amigos
      const friends = await this.getFriendsUsers(userId);
      const totalFriends =
        (fullUser._count?.sentRequests || 0) + (fullUser._count?.receivedRequests || 0);

      // 3. Formateamos conexiones para el front (status e info extra)
      const connections = friends.map((friend) => ({
        ...friend,
        status: this.presenceService.isOnline(friend.id) ? 'online' : 'offline',
        lastSeen: this.presenceService.isOnline(friend.id) ? 'En línea' : 'Desconectado',
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
  async findAllUsers(query: string = '') {
    return await this.prisma.extended.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      // TODO: No devolver password ni email
      select: {
        id: true,
        username: true,
        name: true,
        avatarColor: true,
        initials: true,
      },
    });
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

    return this.prisma.friend.create({
      data: {
        senderId,
        receiverId,
        status: STATUS_FRIENDS_REQ.PENDING,
      },
    });
  }

  // Aceptar/Rechazar/Bloquear solicitud
  async updateFriendStatusUser(senderId: string, receiverId: string, status: FriendStatus) {
    return this.prisma.friend.update({
      where: {
        senderId_receiverId: { senderId, receiverId },
      },
      data: { status },
    });
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
