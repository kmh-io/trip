export type TransportType = "BUS" | "TRAIN" | "FLIGHT";

export interface IRoute {
  id: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
  duration: number;
  transportType: TransportType;
  images: string[];
  operator: IOperator;
  departureStation: IStation;
  arrivalStation: IStation;
}

export interface IRouteList {
  id: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
  duration: number;
  transportType: TransportType;
}

export interface ICreateRoute {
  departure: Date;
  arrival: Date;
  transportType: TransportType;
  origin: string;
  destination: string;
  operatorId: string;
  departureStationId: string;
  arrivalStationId: string;
}

export interface ICity {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStation {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOperator {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuery {
  departure?: string;
}
