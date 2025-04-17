import { BookingStatus } from '@prisma/client';

export class QueryFilter {
  status: BookingStatus;
  departure: Date = new Date();
  minPrice: number = 0;
  maxPrice: number = 0;
}
