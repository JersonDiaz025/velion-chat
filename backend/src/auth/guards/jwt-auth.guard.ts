import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('TOKEN_EXPIRED');
    }
    if (err || !user) {
      throw err || new UnauthorizedException('SESSION_NOT_FOUND');
    }

    return user;
  }
}
