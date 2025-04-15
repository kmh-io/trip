import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadConfig } from './common/config/config.yml';
import { PrismaModule } from './common/prisma/prisma.module';
import { CityModule } from './services/city/city.module';
import { OperatorModule } from './services/operator/operator.module';
import { RouteModule } from './services/route/route.module';
import { StationModule } from './services/station/station.module';
import { TicketModule } from './services/ticket/ticket.module';
import { BookingModule } from './services/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    PrismaModule,
    // UsersModule,
    TicketModule,
    RouteModule,
    OperatorModule,
    CityModule,
    StationModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
