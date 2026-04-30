import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '../messages/messages.module';
import { PresenceModule } from '../presence/presence.module';

@Module({
  imports: [MessagesModule, PresenceModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
