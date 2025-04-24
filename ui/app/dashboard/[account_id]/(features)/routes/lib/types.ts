export type TransportType = 'BUS' | 'TRAIN' | 'FLIGHT';

export interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  data: T;
  success: boolean;
  message: string;
  meta: IMetaData;
}

export interface IRoute {
  id: string
  departure: Date;
  arrival: Date;
  origin: string;
  destination: string;
  duration: number;
  transportType: string;
  images: string[];
  operator: IOperator;
  departureStation: IStation;
  arrivalStation: IStation;
}

export interface IRouteList {
  id: string;
  departure: Date;
  arrival: Date;
  origin: string;
  destination: string;
  duration: number;
  transportType: TransportType;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRoute {
  departure: Date,
  arrival: Date,
  transportType: TransportType,
  origin: string,
  destination: string,
  operatorId: string,
  departureStationId: string,
  arrivalStationId: string
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