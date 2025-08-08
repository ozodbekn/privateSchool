import { Module } from '@nestjs/common';
import { TeacherAttenddanceService } from './teacher-attenddance.service';
import { TeacherAttenddanceController } from './teacher-attenddance.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[PrismaModule, ConfigModule],
  controllers: [TeacherAttenddanceController],
  providers: [TeacherAttenddanceService, JwtService],
})
export class TeacherAttenddanceModule {}
