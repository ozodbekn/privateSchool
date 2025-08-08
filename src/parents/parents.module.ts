import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule, ConfigModule],
  controllers: [ParentsController],
  providers: [ParentsService, JwtService],
})
export class ParentsModule {}
