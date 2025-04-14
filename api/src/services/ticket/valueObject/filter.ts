import { TransportType } from '@prisma/client';

export class QueryFilter {
  departure: Date = new Date();
  transportType: TransportType = 'BUS';
}
