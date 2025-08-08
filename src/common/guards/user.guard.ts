import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header topilmadi");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Token noto'g'ri formatda");
    }

    try {
      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!payload) {
        throw new UnauthorizedException("Token yaroqsiz");
      }

      if (payload.role !== "user") {
        throw new ForbiddenException("Foydalanuvchi role mos emas");
      }

      if (payload.is_active === false) {
        throw new ForbiddenException("Siz faol foydalanuvchi emassiz");
      }

      req.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Token yaroqsiz yoki eskirgan");
    }
  }
}
