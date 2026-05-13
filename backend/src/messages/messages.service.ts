import { Injectable, NotFoundException, InternalServerErrorException, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationLabels, NotificationType } from '../constants/notifications.constans';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => NotificationsService))
    private notificationsService: NotificationsService
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { content, senderId, chatId } = createMessageDto;
    const senderIdStr = String(senderId);
    const chatIdStr = String(chatId);

    try {
      const res = await this.prisma.message.create({
        data: {
          content,
          senderId: senderIdStr,
          chatId: chatIdStr,
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
        },
      });

      if (res) {
        try {
          const recipients = await this.prisma.chatParticipant.findMany({
            where: {
              chatId: chatIdStr,
              userId: { not: senderIdStr },
            },
          });

          const preview = content.length > 140 ? `${content.slice(0, 140)}…` : content;
          const senderLabel = res.sender.name || res.sender.username || 'Alguien';

          for (const { userId } of recipients) {
            await this.notificationsService.notify({
              userId,
              title: NotificationLabels[NotificationType.NEW_MESSAGE],
              body: `${senderLabel}: ${preview}`,
              type: NotificationType.NEW_MESSAGE,
              metadata: {
                userId: senderIdStr,
                name: res.sender.name ?? '',
                username: res.sender.username,
                initials: res.sender.initials ?? '',
                chatId: chatIdStr,
              },
            }, false);
          }
        } catch (notifyError) {
          console.error('No se pudo enviar la notificación de mensaje:', notifyError);
        }
      }

      return res;
    } catch (error) {
      console.error('Error al crear el mensaje:', error);
      throw new InternalServerErrorException('Error al crear el mensaje');
    }
  }

  async findAll() {
    return await this.prisma.message.findMany({
      include: {
        sender: {
          select: { id: true, username: true, avatarColor: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: {
          select: { id: true, username: true, avatarColor: true },
        },
      },
    });
    if (!message) throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    return message;
  }

  async findByChat(chatId: string) {
    return await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
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
      },
    });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    try {
      return await this.prisma.message.update({
        where: { id },
        data: updateMessageDto,
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo actualizar el mensaje ${id}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.message.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo eliminar el mensaje ${id}`);
    }
  }
}
