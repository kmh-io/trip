import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { QueryDTO } from './dto/query.dto';
import { BookingRepository } from './booking.repository';
import { toValidQuery } from 'src/common/pagination/query';
import { QueryFilter } from './valueObject/filter';
import { ItineraryBookingDto } from './dto/itinerary-booking.dto';
import { TicketService } from 'src/services/ticket/ticket.service';
import { PassengerBookingDto } from './dto/passenger-booking.dto';
import { ContactRepository } from './contact.repositoy';
import { PassengerRepository } from './passenger.repository';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name, {
    timestamp: true,
  });

  constructor(
    private readonly bookingRepo: BookingRepository,
    private readonly contactRepo: ContactRepository,
    private readonly passengerRepo: PassengerRepository,
    private readonly ticketService: TicketService,
  ) {}

  private calculateTotalPrice(passengers: number, price: number): number {
    return passengers * price;
  }

  async itineraryBooking({ ticketId, passengers }: ItineraryBookingDto) {
    try {
      const ticket = await this.ticketService.findById(ticketId);
      const totalPrice = this.calculateTotalPrice(
        passengers,
        ticket.data.price.toNumber(),
      );
      const createdBooking = await this.bookingRepo.itinerary({
        passengersCount: passengers,
        totalPrice,
      });

      const newTicket = await this.ticketService.create({
        price: ticket.data.price.toString(),
        bookingId: createdBooking.id,
        routeId: ticket.data.routeId,
      });

      createdBooking.tickets = [newTicket.data];

      return successJsonResponse({
        data: createdBooking,
        message: 'Booking is successfully initiated',
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async passengersBooking(
    id: string,
    { contactDetails, pasengersNumber, passengers }: PassengerBookingDto,
  ) {
    try {
      const booking = await this.bookingRepo.findById(id);
      if (!booking) {
        throw new NotFoundException(`Booking id ${id} is not found`);
      }

      if (booking.status !== BookingStatus.ITINERARY) {
        throw new BadRequestException(
          'Booking is already confirmed or canceled',
        );
      }

      await this.passengerRepo.createMany(
        passengers.map((passenger) => ({ ...passenger, bookingId: id })),
      );

      const totalPrice = this.calculateTotalPrice(
        pasengersNumber,
        booking.totalPrice.toNumber(),
      );

      const existingContact = await this.contactRepo.findByEmail(
        contactDetails.email,
      );

      let updatedBooking: object;
      if (existingContact) {
        updatedBooking = await this.bookingRepo.update(id, {
          status: BookingStatus.PASSENGER,
          contactId: existingContact.id,
          passengersCount: pasengersNumber,
          totalPrice,
        });
      } else {
        const contact = await this.contactRepo.create(contactDetails);
        updatedBooking = await this.bookingRepo.update(id, {
          status: BookingStatus.PASSENGER,
          contactId: contact.id,
          passengersCount: pasengersNumber,
          totalPrice,
        });
      }

      return successJsonResponse({
        data: updatedBooking,
        message: 'Booking is successfully created',
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async confirmBooking(id: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking id ${id} is not found`);
    }

    if (booking.status !== BookingStatus.PASSENGER) {
      throw new BadRequestException('Booking is already confirmed or canceled');
    }

    const updatedBooking = await this.bookingRepo.update(id, {
      status: BookingStatus.CONFIRMED,
    });

    return successJsonResponse({
      data: updatedBooking,
      message: 'Booking is successfully confirmed',
    });
  }

  async paymentBooking(id: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking id ${id} is not found`);
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException('Booking is already confirmed or canceled');
    }

    const updatedBooking = await this.bookingRepo.update(id, {
      status: BookingStatus.PAYMENT_COMPLETED,
    });

    return successJsonResponse({
      data: updatedBooking,
      message: 'Booking is successfully confirmed',
    });
  }

  async cancellationBooking() {}

  async completionBooking() {}

  async findByQuery(queryDTO: QueryDTO) {
    const query = toValidQuery(queryDTO, new QueryFilter());
    const { bookings, total } = await this.bookingRepo.findByQuery(query);

    return successJsonResponse({
      data: bookings,
      message: 'Bookings are successfully fetched.',
      limit: query.take,
      page: query.page,
      total,
    });
  }

  async findById(id: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return successJsonResponse({
      data: booking,
      message: 'Booking is successfully fetched',
    });
  }

  async deleteById(id: string) {
    const existingBooking = await this.bookingRepo.findById(id);
    if (!existingBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    try {
      const deletedBooking = await this.bookingRepo.deleteById(id);
      return successJsonResponse({
        data: { id: deletedBooking.id },
        message: 'Booking deleted successfully',
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid id');
      }
      throw new InternalServerErrorException('Something went wrong!!');
    }
  }
}
