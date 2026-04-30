import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ROUTES } from '../constants/routes';
import RefreshTokenDto from './dto/refresh.dto';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Post(ROUTES.REGISTER)
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post(ROUTES.LOGIN)
  login(@Body() body, @Request() req) {
    console.log('Req', req);

    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(ROUTES.PROFILE)
  async getProfile(@Request() req, @Query('isFull') isFull?: string) {
    const isFullBool = isFull === 'true';
    return await this.userService.getUserById(req?.user.userId, isFullBool);
  }
}
