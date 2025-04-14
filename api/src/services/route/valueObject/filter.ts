import { TransportType } from '@prisma/client';

export class QueryFilter {
  duration: number = 0;
  maxPrice: number = 0;
  minPrice: number = 0;
  departure: Date = new Date();
  transportType: TransportType = 'BUS';
}
