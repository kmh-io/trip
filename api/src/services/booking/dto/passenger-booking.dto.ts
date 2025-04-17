import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContactDetailsDto } from './contact-details.dto';
import { PassengerDto } from './passenger.dto';

export class PassengerBookingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'passengers must be at least 1' })
  pasengersNumber: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactDetailsDto)
  contactDetails: ContactDetailsDto;

  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'At least one passenger is required' })
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  passengers: PassengerDto[];
}
