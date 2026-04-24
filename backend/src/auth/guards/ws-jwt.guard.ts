import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();
      const token =
        client.handshake.auth?.token?.split(" ")[1] ||
        client.handshake.headers?.authorization?.split(" ")[1];

      if (!token) throw new WsException("No se encontró el token");

      const payload = await this.jwtService.verifyAsync(token);

      client.user = payload;
      return true;
    } catch (err) {
      throw new WsException("Token inválido o expirado");
    }
  }
}
