import { Module } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { AdminsController } from "./admins.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [AdminsController],
  providers: [AdminsService, JwtService],
})
export class AdminsModule {}
