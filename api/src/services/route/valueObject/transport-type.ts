import { TransportType } from '@prisma/client';

export const transportTypeMap: Record<string, TransportType> = {
  bus: TransportType.BUS,
  train: TransportType.TRAIN,
  flight: TransportType.FLIGHT,
  taxi: TransportType.TAXI,
};
