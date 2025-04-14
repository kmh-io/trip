import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { StationController } from './station.controller';
import { StationRepository } from './station.repository';
import { StationService } from './station.service';
import { CityModule } from 'src/services/city/city.module';

@Module({
  imports: [PrismaModule, CityModule],
  controllers: [StationController],
  providers: [StationService, StationRepository],
})
export class StationModule {}
