import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryDTO } from './dto/query.dto';
import { BookingService } from './usecase/booking.service';
import { ItineraryBookingDto } from './dto/itinerary-booking.dto';
import { PassengerBookingDto } from './dto/passenger-booking.dto';
import { PaymentDto } from './dto/payment.dto';

@ApiTags('Bookings')
@Controller('api/v1/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // itinerary state
  @Post()
  @HttpCode(HttpStatus.OK)
  inineraryBooking(@Body() data: ItineraryBookingDto) {
    return this.bookingService.itineraryBooking(data);
  }

  // Passenger state
  @Post(':id/passengers')
  @HttpCode(HttpStatus.OK)
  passengersBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: PassengerBookingDto,
  ) {
    return this.bookingService.passengersBooking(id, data);
  }

  @Post(':id/confirmation')
  @HttpCode(HttpStatus.OK)
  confirmationBooking(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.confirmBooking(id);
  }

  @Post(':id/payment')
  @HttpCode(HttpStatus.OK)
  paymentBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: PaymentDto,
  ) {
    return this.bookingService.paymentBooking(id);
  }

  @Post(':id/cancellation')
  @HttpCode(HttpStatus.OK)
  cancellationBooking() {}

  @Post(':id/completion')
  @HttpCode(HttpStatus.OK)
  completionBooking() {}

  @Get()
  @ApiOperation({ summary: 'Get all bookings with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Returns a list of bookings' })
  findAll(@Query() query: QueryDTO) {
    return this.bookingService.findByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns a booking' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a booking' })
  // @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  // @ApiResponse({ status: 200, description: 'Booking updated successfully' })
  // @ApiResponse({ status: 404, description: 'Booking not found' })
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(id, updateBookingDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  remove(@Param('id') id: string) {
    return this.bookingService.deleteById(id);
  }
}
