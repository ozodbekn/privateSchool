import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [StudentsController],
  providers: [StudentsService, JwtService],
})
export class StudentsModule {}
