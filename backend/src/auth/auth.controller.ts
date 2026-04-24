import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ROUTES } from "../constants/routes";
import RefreshTokenDto from "./dto/refresh.dto";

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post(ROUTES.REGISTER)
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  @Post(ROUTES.LOGIN)
  login(@Body() body) {
    return this.authService.login(body);
  }

  // @Post("refresh")
  // @HttpCode(HttpStatus.OK)
  // async refresh(@Body() body: RefreshTokenDto) {
  //   return this.authService.refreshToken(body);
  // }

  @UseGuards(JwtAuthGuard)
  @Get(ROUTES.PROFILE)
  async getProfile(@Request() req) {
    return await this.userService.getUserById(req.user.userId);
  }
}
