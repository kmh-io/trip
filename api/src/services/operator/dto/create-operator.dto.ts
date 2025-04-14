import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOperatorDto {
  @ApiProperty({
    description: 'Name of the operator',
    type: String,
    example: 'Operator 1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
