import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class ItineraryBookingDto {
  @IsNotEmpty()
  @IsUUID('4')
  ticketId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'passengers must be at least 1' })
  passengers: number;
}
