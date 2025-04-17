import { PartialType } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingDto {
  status: BookingStatus;
  contactId?: string;
  passengersCount?: number;
  totalPrice?: number;
}
