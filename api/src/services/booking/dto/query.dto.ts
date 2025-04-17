import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { BaseQueryDTO } from 'src/common/pagination/base-query.dto';

export class QueryDTO extends BaseQueryDTO {
  @ApiProperty({
    description: 'Filter by booking status',
    type: String,
    example: 'CONFIRMED',
    required: false,
    enum: ['ITINERARY', 'PASSENGER', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  @Transform(({ value }) => BookingStatus[value])
  status: BookingStatus;

  @ApiProperty({
    description: 'Filter by date range (departure date)',
    example: '2025-04-25T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  departure: Date;

  @ApiProperty({
    description: 'Ordering based on orderBy',
    type: String,
    example: 'createdAt',
  })
  @IsString()
  @IsIn(['createdAt', 'updatedAt'])
  @IsOptional()
  orderBy: string = 'createdAt';
}
