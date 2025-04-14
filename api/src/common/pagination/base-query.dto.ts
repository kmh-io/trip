import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class BaseQueryDTO {
  @ApiProperty({
    description: 'The current page',
    default: 1,
    type: Number,
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'Page number must be at least 1' })
  page: number = 1;

  @ApiProperty({
    description: 'The number of operators',
    default: 10,
    type: Number,
    example: 10,
    required: false,
  })
  @IsNumber()
  @Min(10)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @ApiProperty({
    description: 'Ordering based on orderBy',
    type: String,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  orderBy: string;

  @ApiProperty({
    description: 'Sorting by asc or desc',
    type: String,
    default: 'asc',
    example: 'asc',
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'], { message: "sortBy must be 'asc' or 'desc'" })
  sortBy: string = 'asc';
}
