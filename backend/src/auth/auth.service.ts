import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserEntity } from "./types/user";
import { PayloadEntity, PayloadFull } from "./types/payload";
import RefreshTokenDto from "./dto/refresh.dto";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../constants/auth";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: UserEntity) {
    const payload: PayloadEntity = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: {
          initials: user.initials,
          color: user.avatarColor,
        },
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async refreshToken(body: RefreshTokenDto) {
    try {
      const payload: PayloadFull = await this.jwtService.verifyAsync(
        body.refreshToken,
      );
      const { exp, iat, ...result } = payload;
      const refreshToken = await this.jwtService.signAsync(result, {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES_IN,
      });
      return { refreshToken };
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(body: CreateUserDto) {
    try {
      const user = await this.usersService.findOneUser(
        body.username,
        body.email,
      );

      const isMatch = await bcrypt.compare(body.password, user?.password ?? "");
      if (user && isMatch) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException("Credenciales inválidas");
    } catch (error) {
      if (error instanceof Error)
        throw new InternalServerErrorException(error.message);
    }
  }
}
