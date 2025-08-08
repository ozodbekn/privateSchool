import { Module } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { SchoolsController } from "./schools.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [SchoolsController],
  providers: [SchoolsService, JwtService],
})
export class SchoolsModule {}
