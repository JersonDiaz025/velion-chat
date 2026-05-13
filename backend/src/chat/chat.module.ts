import { forwardRef, Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PresenceModule } from '../presence/presence.module';
import { ChatController } from './chat.controller';
import { MessagesModule } from '../messages/messages.module';

@Module({
  controllers: [ChatController],
  imports: [PresenceModule, forwardRef(() => MessagesModule),],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
})
export class ChatModule {}
