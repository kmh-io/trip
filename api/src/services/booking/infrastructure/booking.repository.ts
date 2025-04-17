import { Injectable } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Query } from 'src/common/pagination/query';
import { UpdateBookingDto } from '../dto/update-booking.dto';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByQuery({ skip, take, orderBy, filters }: Query) {
    const { departure, ...rest } = filters;
    const startOfDay = new Date(departure);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(departure);
    endOfDay.setHours(23, 59, 59, 999);

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where: {
          ...rest,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
        orderBy,
        skip,
        take,
      }),
      this.prisma.booking.count({
        where: {
          ...rest,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
      }),
    ]);

    return { bookings, total };
  }

  async findById(id: string) {
    return this.prisma.booking.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        contact: true,
        tickets: true,
        payment: true,
        passengers: true,
      },
    });
  }

  async itinerary({
    passengersCount,
    totalPrice,
  }: {
    passengersCount: number;
    totalPrice: number;
  }) {
    return this.prisma.booking.create({
      data: {
        totalPrice,
        passengersCount,
      },
      include: {
        tickets: true,
        passengers: true,
      },
    });
  }

  async update(
    id: string,
    { contactId, passengersCount, totalPrice, status }: UpdateBookingDto,
  ) {
    const contact = contactId ? this.prisma.connectId(contactId) : undefined;

    return this.prisma.booking.update({
      where: { id, deletedAt: null },
      data: {
        passengersCount,
        totalPrice,
        status,
        contact,
      },
      include: {
        tickets: true,
        passengers: true,
        payment: true,
      },
    });
  }

  async deleteById(id: string): Promise<Booking> {
    return this.prisma.booking.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
