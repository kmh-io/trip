import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseQueryDTO } from 'src/common/pagination/base-query.dto';

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
    example: '2025-04-25',
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
