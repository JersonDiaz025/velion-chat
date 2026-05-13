import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatGateway } from '../chat/chat.gateway';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway
  ) {}

  /**
   * Envía a un solo usuario
   */
  async notify(dto: CreateNotificationDto) {
    // const notification = await this.prisma.notification.create({
    //   data: {
    //     userId: dto.userId,
    //     title: dto.title,
    //     body: dto.body,
    //     type: dto.type,
    //     metadata: dto.metadata,
    //   },
    // });
    const notification = {
      data: {
        userId: dto.userId,
        title: dto.title,
        body: dto.body,
        type: dto.type,
        metadata: dto.metadata,
      },
    };

    if (this.chatGateway.server) {
      this.chatGateway.server.to(dto.userId).emit('notification', notification.data);
    }

    return notification;
  }

  /**
   * MÉTODO MAESTRO GLOBAL: Notifica a todos los usuarios
   */
  async notifyAll(dto: Omit<CreateNotificationDto, 'userId'>) {
    // 1. Obtenemos todos los IDs de usuarios activos
    const users = await this.prisma.user.findMany({ select: { id: true } });

    if (users.length === 0) return;

    // 2. Persistencia Masiva (Bulk Insert) - Mucho más rápido que un loop
    const notificationsData = users.map((user) => ({
      userId: user.id,
      title: dto.title,
      body: dto.body,
      type: dto.type,
      metadata: dto.metadata,
    }));

    await this.prisma.notification.createMany({
      data: notificationsData,
    });

    // 3. Emisión en tiempo real (Broadcast global)
    if (this.chatGateway.server) {
      // Emitimos a un evento global o a todos los sockets conectados
      this.chatGateway.server.emit('notification', {
        ...dto,
        isGlobal: true,
        createdAt: new Date(),
      });
      console.log(`📢 Notificación global enviada a ${users.length} usuarios.`);
    }
  }

  /**
   * Obtener notificaciones con Paginación
   */
  async getUserNotifications(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    userId: string
  ) {
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.prisma.notification.count({ where: { userId } }),
      this.prisma.notification.findMany({
        where: {
          userId,
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { body: { contains: search, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        canNavigate: total > limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id: string) {
    return await this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }
}
