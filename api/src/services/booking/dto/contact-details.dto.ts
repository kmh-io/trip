import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ContactDetailsDto {
  @IsNotEmpty()
  @IsPhoneNumber('MM')
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
