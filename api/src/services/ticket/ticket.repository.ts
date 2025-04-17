import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from '@prisma/client';
import { Query } from 'src/common/pagination/query';

@Injectable()
export class TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  private connect(value: string) {
    return {
      connect: {
        id: value,
      },
    };
  }

  async findAllByQuery({ take, skip, orderBy, filters }: Query) {
    return this.prisma.ticket.findMany({
      where: {
        ...filters,
        deletedAt: null,
      },
      orderBy,
      take,
      skip,
      include: {
        route: true,
      },
    });
  }

  async findAllByDate(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.ticket.findMany({
      where: {
        route: {
          departure: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        deletedAt: null,
      },
      include: {
        route: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.ticket.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        route: true,
      },
    });
  }

  async findByIds(ids: string[]): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        id: {
          in: ids,
        },
        deletedAt: null,
      },
    });
  }

  async insert({
    routeId,
    bookingId,
    ...rest
  }: CreateTicketDto): Promise<Ticket> {
    const route = this.connect(routeId);
    const booking = bookingId ? this.connect(bookingId) : undefined;

    return this.prisma.ticket.create({
      data: {
        route,
        booking,
        price: rest.price,
      },
      include: {
        route: true,
      },
    });
  }

  async update(id: string, ticketData: UpdateTicketDto): Promise<Ticket> {
    const { routeId, bookingId, ...rest } = ticketData;
    const route = routeId ? this.connect(routeId) : undefined;
    const booking = bookingId ? this.connect(bookingId) : undefined;

    return this.prisma.ticket.update({
      where: { id },
      data: {
        route,
        booking,
        ...rest,
      },
      include: {
        route: true,
      },
    });
  }

  async deleteById(id: string): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
