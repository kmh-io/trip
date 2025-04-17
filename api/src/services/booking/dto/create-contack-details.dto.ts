import { ContactDetailsDto } from './contact-details.dto';

export class CreateContactDetailsDto extends ContactDetailsDto {
  bookingId: string;
}
