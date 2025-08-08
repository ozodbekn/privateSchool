import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class UserSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const user = req.user;
    const paramId = parseInt(req.params.id, 10);
    if (!user || user.id !== paramId || user.role !== "user" || user.is_active === false) {
      throw new ForbiddenException("Siz faqat o'z profilingizni ko'ra olasiz");
    }

    return true;
  }
}
