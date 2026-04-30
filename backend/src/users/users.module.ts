import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PresenceService } from '../presence/presence.service';
import { PresenceModule } from '../presence/presence.module';

@Module({
  imports: [PrismaModule, PresenceModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
