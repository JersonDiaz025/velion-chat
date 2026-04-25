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
    private jwtService: JwtService
  ) {}

  async login(userBody: UserEntity) {
    const userData = await this.usersService.findOneUser(userBody.email);
    return {
      token: this.jwtService.sign(userBody),
      message: `Bienvenido ${userData?.name || userData?.username}`,
      user: {
        name: userData?.name,
        username: userData?.username,
        email: userData?.email,
        avatar: {
          initials: userData?.initials,
          color: userData?.avatarColor,
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

  // async refreshToken(body: RefreshTokenDto) {
  //   try {
  //     const payload: PayloadFull = await this.jwtService.verifyAsync(
  //       body.refreshToken,
  //     );

  //     const user = await this.usersService.getUserById(payload.sub);

  //     if (!user || user.refreshToken !== body.refreshToken) {
  //       throw new UnauthorizedException("Invalid refresh token");
  //     }

  //     const newAccessToken = await this.jwtService.signAsync(
  //       { sub: user.id, username: user.username },
  //       {
  //         secret: JWT_SECRET,
  //         expiresIn: "15m",
  //       },
  //     );

  //     return { token: newAccessToken };
  //   } catch (error) {
  //     throw new UnauthorizedException("Invalid refresh token");
  //   }
  // }

  async validateUser(body: CreateUserDto) {
    try {
      const user = await this.usersService.findOneUser(body.email);

      const isMatch = await bcrypt.compare(body.password, user?.password ?? "");
      if (!isMatch || !user) {
        throw new UnauthorizedException("Email o contraseña incorrectos.");
      }

      if (!user || !isMatch) {
        throw new UnauthorizedException("Email o contraseña incorrectos");
      }

      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("Error interno en la validación");
    }
  }
}
