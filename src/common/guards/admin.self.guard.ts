import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AdminSelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
  
      const user = req.user;
      const paramId = parseInt(req.params.id, 10);
      if (!user || user.id !== paramId) {
        throw new ForbiddenException("Admin faqat o'z profilingizni ko'ra olasiz");
      }
  
      return true;
    }
}
