import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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
    description: 'Ordering based on orderBy',
    type: String,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  orderBy: string = 'name';
}
