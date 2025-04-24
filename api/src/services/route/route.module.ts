import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { OperatorModule } from '../operator/operator.module';
import { StationModule } from '../station/station.module';
import { RouteController } from './route.controller';
import { RouteRepository } from './route.repository';
import { RouteService } from './route.service';

// Route is from a location to another location of the system, it isn't http route
@Module({
  imports: [PrismaModule, OperatorModule, StationModule],
  controllers: [RouteController],
  providers: [RouteService, RouteRepository],
  exports: [RouteService],
})
export class RouteModule {}
