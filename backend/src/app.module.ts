import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma/prisma.service';
import { PresenceModule } from './presence/presence.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PresenceModule,
    MessagesModule,
    AuthModule,
    ChatModule,
    NotificationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
