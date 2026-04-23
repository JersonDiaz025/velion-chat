import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";

@Module({
  controllers: [MessagesController],
  exports: [MessagesService],
  providers: [MessagesService],
})
export class MessagesModule {}
