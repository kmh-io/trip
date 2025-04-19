export type TransportType = "BUS" | "TRAIN" | "FLIGHT";

export interface OperatorType {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

export interface StationType {
  id: string;
  name: string;
  address: string;
  description?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface TicketType {
  id: string;
  type: string;
  price: number;
  description: string;
  available: boolean;
  routeId: string;
}

export interface RouteType {
  id: string;
  departure: string | Date;
  arrival: string | Date;
  origin: string;
  destination: string;
  duration: number;
  images: string[];
  transportType: TransportType;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
  operatorId: string;
  departureStationId: string;
  arrivalStationId: string;
  operator: OperatorType;
  departureStation: StationType;
  arrivalStation: StationType;
  tickets: TicketType[];
}
