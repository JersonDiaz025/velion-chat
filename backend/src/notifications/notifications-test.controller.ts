import { Controller, Get, Param } from '@nestjs/common';
import { NotificationTestService } from './notification-test.service';

@Controller('dev/test-notifications') // Ruta: localhost:3000/dev/test-notifications/...
export class NotificationsTestController {
  constructor(private readonly testService: NotificationTestService) {}

  @Get(':userId')
  async triggerTests(@Param('userId') userId: string) {
    return await this.testService.runAllTests(userId);
  }
}
