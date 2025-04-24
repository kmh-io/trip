export default class FindByIdRouteDto {
  id: string = '';
  departure: Date = new Date();
  arrival: Date = new Date();
  origin: string = '';
  destination: string = '';
  duration: number = 0;
  transportType: string = '';
  operator: {
    id: string;
    name: string;
  } = {
    id: '',
    name: '',
  };
  departureStation: {
    id: string;
    name: string;
  } = {
    id: '',
    name: '',
  };
  arrivalStation: {
    id: string;
    name: string;
  } = {
    id: '',
    name: '',
  };
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
