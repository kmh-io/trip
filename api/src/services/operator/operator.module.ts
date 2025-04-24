import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { OperatorController } from './operator.controller';
import { OperatorRepository } from './operator.repository';
import { OperatorService } from './operator.service';

@Module({
  imports: [PrismaModule],
  controllers: [OperatorController],
  providers: [OperatorService, OperatorRepository],
  exports: [OperatorRepository],
})
export class OperatorModule {}
