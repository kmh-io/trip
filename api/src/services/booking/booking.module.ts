import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { BookingController } from './booking.controller';
import { BookingRepository } from './infrastructure/booking.repository';
import { BookingService } from './usecase/booking.service';
import { TicketModule } from '../ticket/ticket.module';
import { PassengerRepository } from './infrastructure/passenger.repository';
import { ContactRepository } from './infrastructure/contact.repositoy';

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
