import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseQueryDTO } from 'src/common/pagination/base-query.dto';

export class QueryDTO extends BaseQueryDTO {
  @ApiProperty({
    description: 'Filter by station name',
    type: String,
    example: 'Station 1',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Filter by city ID',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  cityId: string;

  @ApiProperty({
    description: 'Ordering based on orderBy',
    type: String,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  orderBy: string = 'name';
}
