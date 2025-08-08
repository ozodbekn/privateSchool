import { Module } from "@nestjs/common";
import { DirectorsService } from "./directors.service";
import { DirectorsController } from "./directors.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [DirectorsController],
  providers: [DirectorsService, JwtService],
})
export class DirectorsModule {}
