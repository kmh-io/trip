import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { BookingService } from './booking.service';
import { TicketModule } from '../ticket/ticket.module';
import { PassengerRepository } from './passenger.repository';
import { ContactRepository } from './contact.repositoy';

@Module({
  imports: [PrismaModule, TicketModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    PassengerRepository,
    ContactRepository,
  ],
  exports: [BookingService],
})
export class BookingModule {}
