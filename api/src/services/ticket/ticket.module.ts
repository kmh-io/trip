import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { TicketService } from './ticket.service';
import { RouteModule } from '../route/route.module';

@Module({
  imports: [PrismaModule, RouteModule],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
})
export class TicketModule {}
