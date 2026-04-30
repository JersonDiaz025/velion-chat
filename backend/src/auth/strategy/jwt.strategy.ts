// import { ExtractJwt, Strategy } from "passport-jwt";
// import { PassportStrategy } from "@nestjs/passport";
// import { Injectable } from "@nestjs/common";
// import { JWT_SECRET } from "../../constants/auth";
// import { PayloadEntity } from "../types/payload";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: JWT_SECRET,
//     });
//   }

//   validate(payload: PayloadEntity) {
//     return { userId: payload.id, email: payload.email };
//   }
// }
// En tu Backend (NestJS): jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express'; // 👈 Importante
import { JWT_SECRET } from '../../constants/auth';
import { PayloadEntity } from '../types/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['session'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(payload: PayloadEntity) {
    return { userId: payload?.sub, email: payload?.email };
  }
}
