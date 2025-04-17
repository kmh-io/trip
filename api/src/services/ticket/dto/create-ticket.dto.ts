import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'ID of the route for this ticket',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID(4)
  bookingId?: string;

  @ApiProperty({
    description: 'ID of the route for this ticket',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID(4)
  routeId: string;

  @ApiProperty({
    description: 'Price of the ticket (up to two decimal digits)',
    example: '123.45',
  })
  @IsNotEmpty()
  @IsDecimal(
    { decimal_digits: '0,2' },
    { message: 'price is not a valid decimal number.' },
  )
  price: string;
}
