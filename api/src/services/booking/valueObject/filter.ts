import { BookingStatus } from '@prisma/client';

export class QueryFilter {
  status: BookingStatus;
  userId: string;
  startDate: Date;
  endDate: Date;
  minPrice: number = 0;
  maxPrice: number = 0;
}
