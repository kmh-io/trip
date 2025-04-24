import { Gender, IdType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PassengerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(IdType)
  @Transform(({ value }) => IdType[value])
  idType: IdType;

  @IsNotEmpty()
  @IsString()
  idNumber: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  @Transform(({ value }) => Gender[value])
  gender: Gender;
}
