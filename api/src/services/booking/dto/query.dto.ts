import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
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
  status: BookingStatus;

  @ApiProperty({
    description: 'Filter by user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Filter by date range (start)',
    example: '2025-04-25T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Filter by date range (end)',
    example: '2025-04-26T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: 'Ordering based on orderBy',
    type: String,
    example: 'createdAt',
  })
  @IsString()
  @IsOptional()
  orderBy: string = 'createdAt';
}
