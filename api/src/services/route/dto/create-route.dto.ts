import { ApiProperty } from '@nestjs/swagger';
import { TransportType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { transportTypeMap } from '../valueObject/transport-type';

export class CreateRouteDto {
  @ApiProperty({
    description: 'Departure date and time',
    example: '2023-12-25T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  departure: Date;

  @ApiProperty({
    description: 'Arrival date and time',
    example: '2023-12-25T14:30:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  arrival: Date;

  @ApiProperty({
    description: 'Filter by station name',
    example: 'Station 1',
  })
  @IsNotEmpty()
  @IsIn(['BUS', 'TRAIN', 'FLIGHT', 'TAXI'])
  @IsString()
  @Transform(({ value }) => transportTypeMap[value])
  transportType: TransportType;

  @ApiProperty({
    description: 'Origin city or location',
    example: 'New York',
  })
  @IsNotEmpty()
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Destination city or location',
    example: 'Los Angeles',
  })
  @IsNotEmpty()
  @IsString()
  destination: string;

  @ApiProperty({
    description: 'Duration of the journey in minutes',
    example: 270,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({
    description: 'Array of image URLs for the route',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({
    description: 'ID of the operator providing this route',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  operatorId: string;

  @ApiProperty({
    description: 'ID of the departure station',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  @IsString()
  departureStationId: string;

  @ApiProperty({
    description: 'ID of the arrival station',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsNotEmpty()
  @IsString()
  arrivalStationId: string;
}
