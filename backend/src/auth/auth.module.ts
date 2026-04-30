import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../constants/auth';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { PresenceModule } from '../presence/presence.module';

@Module({
  imports: [
    UsersModule,
    PresenceModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
