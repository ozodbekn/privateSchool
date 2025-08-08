import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule, ConfigModule],
  controllers: [LessonsController],
  providers: [LessonsService, JwtService],
})
export class LessonsModule {}
