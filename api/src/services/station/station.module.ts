import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CityModule } from 'src/services/city/city.module';
import { StationController } from './station.controller';
import { StationRepository } from './station.repository';
import { StationService } from './station.service';

@Module({
  imports: [PrismaModule, CityModule],
  controllers: [StationController],
  providers: [StationService, StationRepository],
  exports: [StationRepository],
})
export class StationModule {}
