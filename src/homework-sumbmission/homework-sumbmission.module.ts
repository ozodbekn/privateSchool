import { Module } from '@nestjs/common';
import { HomeworkSumbmissionService } from './homework-sumbmission.service';
import { HomeworkSumbmissionController } from './homework-sumbmission.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule,
    ConfigModule
  ],
  controllers: [HomeworkSumbmissionController],
  providers: [HomeworkSumbmissionService, JwtService],
})
export class HomeworkSumbmissionModule {}
