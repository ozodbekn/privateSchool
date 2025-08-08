import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports:[PrismaModule, ConfigModule],
  controllers: [ClassesController],
  providers: [ClassesService, JwtService],
})
export class ClassesModule {}
