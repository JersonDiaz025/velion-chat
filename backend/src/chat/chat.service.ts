// src/chat/chat.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

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
        return (
          ids.length === 2 && ids.includes(userId) && ids.includes(targetId)
        );
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
  async findAllUserChats(userId: number) {
    return this.prisma.chat.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                initials: true,
                avatarColor: true,
              },
            },
          },
        },
        messages: {
          take: 1, // Traer el último mensaje para la vista de lista
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  // Chat limitados, primera carga
  async findByChat(chatId: number, limit = 50) {
    return this.prisma.message.findMany({
      where: { chatId },
      take: limit,
      orderBy: { createdAt: "desc" },
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

  async findOne(id: number) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        participants: { include: { user: true } },
        messages: true,
      },
    });
  }
}
