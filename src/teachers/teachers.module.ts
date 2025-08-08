import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule, ConfigModule],
  controllers: [TeachersController],
  providers: [TeachersService, JwtService],
})
export class TeachersModule {}
