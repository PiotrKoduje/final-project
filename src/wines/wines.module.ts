import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { WinesService } from './wines.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [WinesController],
  providers: [WinesService, PrismaService]
})
export class WinesModule {}
