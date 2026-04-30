import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { PresenceService } from '../presence/presence.service';

@Module({
  providers: [PresenceService],
  exports: [PresenceService],
})
export class PresenceModule {}
