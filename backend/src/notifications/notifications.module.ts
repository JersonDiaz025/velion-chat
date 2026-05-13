import { ChatModule } from '../chat/chat.module';
import { Global, Module, forwardRef } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationTestService } from './notification-test.service';
import { NotificationsTestController } from './notifications-test.controller';

@Global()
@Module({
  imports: [forwardRef(() => ChatModule)],
  controllers: [NotificationsController, NotificationsTestController],
  providers: [NotificationsService, NotificationTestService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
