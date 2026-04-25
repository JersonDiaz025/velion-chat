import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { getAvatarData } from "../utils/avatar-generator";
import { STATUS_FRIENDS_REQ } from "../constants/status-friends-req";
import { FriendStatus } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create a new user with hashed password and avatar data
  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOneUser(
        createUserDto.email,
        createUserDto.username
      );

      if (existingUser) {
        throw new BadRequestException("El usuario o email ya existe.");
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const avatarData = getAvatarData(
        createUserDto.name || createUserDto.username
      );

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
  async getUserById(userId: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException("Usuario no encontrado");
      }
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  async findOneUser(email: string, username?: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { username: username }],
        },
      });
      return user ? user : null;
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  // Update user
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
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
  async findAllUsers(query: string = "") {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
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
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Send friend request
  async sendFriendRequestUser(senderId: number, receiverId: number) {
    if (senderId === receiverId)
      throw new BadRequestException("No puedes agregarte a ti mismo");

    return this.prisma.friend.create({
      data: {
        senderId,
        receiverId,
        status: STATUS_FRIENDS_REQ.PENDING,
      },
    });
  }

  // Aceptar/Rechazar/Bloquear solicitud
  async updateFriendStatusUser(
    senderId: number,
    receiverId: number,
    status: FriendStatus
  ) {
    return this.prisma.friend.update({
      where: {
        senderId_receiverId: { senderId, receiverId },
      },
      data: { status },
    });
  }

  // Obtener amigos del usuario
  // En UsersService
  async getFriendsUsers(userId: number) {
    const friendships = await this.prisma.friend.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
        status: STATUS_FRIENDS_REQ.ACCEPTED,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatarColor: true,
            initials: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            name: true,
            avatarColor: true,
            initials: true,
          },
        },
      },
    });

    return friendships.map((f) =>
      f.senderId === userId ? f.receiver : f.sender
    );
  }
}
