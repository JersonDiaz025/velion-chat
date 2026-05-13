import {
  Controller,
  Get,
  Param,
  Request,
  Patch,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ROUTES } from '../constants/routes';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.NOTIFICATIONS)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('q') search: string,
    @Request()
    req
  ) {
    return await this.notificationsService.getUserNotifications(
      page,
      limit,
      search,
      req?.user.userId || req?.user?.sub
    );
  }

  @Patch('read-all')
  async markAllAsRead(@Request() req) {
    const userId = req?.user?.userId || req?.user?.sub;
    return await this.notificationsService.markAllAsRead(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @Request() req) {
    const userId = req?.user?.userId || req?.user?.sub;
    return await this.notificationsService.markAsRead(id, userId);
  }
}
