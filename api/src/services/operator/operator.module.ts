import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { OperatorRepository } from './operator.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OperatorController],
  providers: [OperatorService, OperatorRepository],
})
export class OperatorModule {}
