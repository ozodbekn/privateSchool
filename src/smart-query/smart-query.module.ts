import { Module } from '@nestjs/common';
import { SmartQueryService } from './smart-query.service';
import { SmartQueryController } from './smart-query.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [SmartQueryController],
  providers: [SmartQueryService, JwtService],
})
export class SmartQueryModule {}
