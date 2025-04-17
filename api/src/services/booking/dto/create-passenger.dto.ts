import { PassengerDto } from './passenger.dto';

export class CreatePassengerDto extends PassengerDto {
  bookingId: string;
}
