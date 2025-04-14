import { ApiProperty } from '@nestjs/swagger';
import { TransportType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseQueryDTO } from 'src/common/pagination/base-query.dto';
import { transportTypeMap } from '../valueObject/transport-type';

export class QueryDTO extends BaseQueryDTO {
  @ApiProperty({
    description: 'Filter by station name',
    type: String,
    example: 'Station 1',
    required: false,
  })
  @IsOptional()
  @IsIn(['bus', 'train', 'flight', 'taxi'])
  @IsString()
  transportType: string = 'bus';

  @ApiProperty({
    description: 'Departure date and time',
    example: '2025-04-25T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  departure: Date = new Date();

  @ApiProperty({
    description: 'Ordering based on orderBy',
    type: String,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  orderBy: string = 'departure';
}
