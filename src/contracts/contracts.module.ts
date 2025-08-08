import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [ContractsController],
  providers: [ContractsService, JwtService],
})
export class ContractsModule {}
