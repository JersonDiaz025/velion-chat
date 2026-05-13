// testing/notification-test.service.ts
import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationLabels, NotificationType } from '../constants/notifications.constans';

@Injectable()
export class NotificationTestService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async runAllTests(targetUserId: string) {
    console.log('🚀 Iniciando pruebas de notificaciones para:', targetUserId);

    await this.notificationsService.notify({
      userId: targetUserId,
      title: NotificationLabels[NotificationType.FRIEND_REQUEST],
      body: `Pablo quiere ser tu amigo.`,
      type: NotificationType.FRIEND_REQUEST,
      metadata: {
        userId: 'cmp19nf6b000084ijzu7b9nyi', // ID de Pablo
        name: 'Pablo',
        username: 'pablo12',
        initials: 'P',
      },
    });

    // await this.notificationsService.notify({
    //   userId: targetUserId,
    //   title: NotificationLabels[NotificationType.FRIEND_ACCEPTED],
    //   body: `Prueba aceptó tu solicitud de amistad.`,
    //   type: NotificationType.FRIEND_ACCEPTED,
    //   metadata: {
    //     friendId: 'cmozgajw20000nkij5yj54qag', // ID de Prueba
    //     name: 'Prueba',
    //     initials: 'PR',
    //   },
    // });

    // await this.notificationsService.notify({
    //   userId: targetUserId,
    //   title: NotificationLabels[NotificationType.USER_JOINED],
    //   body: `Alex Diaz se ha unido a Velion.`,
    //   type: NotificationType.USER_JOINED,
    //   metadata: {
    //     userId: 'cmomy31wp0000ggijipuc3nx6',
    //     name: 'Alex Diaz',
    //     initials: 'AD',
    //   },
    // });

    // await this.notificationsService.notify({
    //   userId: targetUserId,
    //   title: NotificationLabels[NotificationType.LOGIN_DETECTION],
    //   body: `Se detectó un inicio de sesión desde un dispositivo nuevo.`,
    //   type: NotificationType.LOGIN_DETECTION,
    //   metadata: {
    //     location: 'Santo Domingo, DR',
    //     device: 'Chrome on Windows',
    //   },
    // });

    console.log('✅ Todas las notificaciones de prueba enviadas.');
  }
}
