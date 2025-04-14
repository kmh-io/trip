import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStationDto {
  @ApiProperty({
    description: 'Name of the station',
    type: String,
    example: 'Station 1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
