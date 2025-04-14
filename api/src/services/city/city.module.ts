import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CityController } from './city.controller';
import { CityRepository } from './city.repository';
import { CityService } from './city.service';

@Module({
  imports: [PrismaModule],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityService],
})
export class CityModule {}
