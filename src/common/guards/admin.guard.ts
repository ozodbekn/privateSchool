import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
    private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header topilmadi");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Token noto'g'ri formatda");
    }

    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken) {
      throw new UnauthorizedException("Token yaroqsiz yoki eskirgan");
    }

    const admin = await this.prisma.admins.findUnique({ where: {email: decodedToken.email} });
    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }  
    const isMatched = await bcrypt.compare(token, admin.hashedRefreshToken!)
    if (!isMatched) {
      throw new UnauthorizedException("Token yaroqsiz yoki eskirgan");
    }  

    if(admin.is_active == false) {
      throw new ForbiddenException("Admin faol emas");
    }

    if(decodedToken.role !== "admin") {
      throw new ForbiddenException("Admin rolida emassiz");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      req["user"] = payload
      return true;
    } catch (err) {
      throw new UnauthorizedException("Token yaroqsiz yoki eskirgan");
    }
  }
}
