import { Module } from '@nestjs/common';
import { StudentAttenddanceService } from './student-attenddance.service';
import { StudentAttenddanceController } from './student-attenddance.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({ 
  imports: [PrismaModule, ConfigModule],
  controllers: [StudentAttenddanceController],
  providers: [StudentAttenddanceService, JwtService],
})
export class StudentAttenddanceModule {}
