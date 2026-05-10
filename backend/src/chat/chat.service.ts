// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { PresenceService } from '../presence/presence.service';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private presenceService: PresenceService
  ) {}

  async create(createChatDto: CreateChatDto) {
    const { userId, targetId, isGroup, name } = createChatDto;

    if (!isGroup) {
      const chats = await this.prisma.chat.findMany({
        where: {
          isGroup: false,
          participants: {
            some: { userId: userId },
          },
        },
        include: {
          participants: true,
        },
      });

      const existingChat = chats.find((chat) => {
        const ids = chat.participants.map((p) => p.userId);
        return ids.length === 2 && ids.includes(userId) && ids.includes(targetId);
      });

      if (existingChat) return existingChat;
    }

    return this.prisma.chat.create({
      data: {
        isGroup,
        name: isGroup ? name : null,
        participants: {
          create: [{ userId }, { userId: targetId }],
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatarColor: true,
                initials: true,
              },
            },
          },
        },
      },
    });
  }

  // Obtener todos los chats de un usuario específico
  //   async findAllUserChats(userId: string) {
  //     return await this.prisma.chat.findMany({
  //       where: {
  //         participants: { some: { userId } },
  //       },
  //       include: {
  //         participants: {
  //           where: {
  //             userId: { not: userId },
  //           },
  //           include: {
  //             user: {
  //               select: {
  //                 id: true,
  //                 name: true,
  //                 username: true,
  //                 initials: true,
  //                 avatarColor: true,
  //                 status: this.presenceService.isOnline(friend.id) ? 'online' : 'offline',
  //                 lastSeen: this.presenceService.isOnline(friend.id) ? 'En línea' : 'Desconectado',
  //               },
  //             },
  //           },
  //         },
  //         messages: {
  //           take: 1, // Traer el último mensaje para la vista de lista
  //           orderBy: { createdAt: 'desc' },
  //         },
  //       },
  //     });
  //   }
  async findAllUserChats(userId: string) {
    // 1. Obtenemos los chats de la DB
    const chats = await this.prisma.chat.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: {
          where: {
            userId: { not: userId }, // Filtramos para traer solo al "otro"
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                initials: true,
                avatarColor: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // 2. Mapeamos para inyectar el estado de presencia del servicio
    return chats?.map((chat) => {
      // Obtenemos al otro usuario (asumiendo chat individual)
      const otherParticipant = chat?.participants[0]?.user;

      if (otherParticipant) {
        const isOnline = this.presenceService.isOnline(otherParticipant.id);

        // Inyectamos las propiedades dinámicas
        return {
          ...chat,
          isOnline,
        };
      }

      return chat;
    });
  }

  // Chat limitados, primera carga
  async findByChat(chatId: string, limit = 50) {
    return this.prisma.message.findMany({
      where: { chatId },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatarColor: true,
            initials: true,
          },
        },
      },
    });
  }

  // chat.service.ts
  async findParticipantsByChatId(chatId: string) {
    return this.prisma.chatParticipant.findMany({
      where: { chatId },
      select: { userId: true },
    });
  }

  async findOne(id: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        participants: {
          where: {
            userId: { not: userId },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                initials: true,
                avatarColor: true,
              },
            },
          },
        },
        // messages: true,
      },
    });

    if (!chat) return null;

    // const otherParticipant = chat.participants.find(
    //   (participant) => participant.userId !== userId
    // )?.user;

    return {
      participant: chat.participants[0]?.user,
    };
  }
}
