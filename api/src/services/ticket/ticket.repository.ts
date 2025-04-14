import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from '@prisma/client';
import { BaseQuery } from 'src/common/pagination/query';
import { QueryFilter } from './valueObject/filter';

@Injectable()
export class TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByQuery({
    take,
    skip,
    orderBy,
    filters,
  }: BaseQuery<QueryFilter>) {
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
        // route: {
        //   include: {
        //     operator: true,
        //     departureStation: {
        //       include: {
        //         city: true,
        //       },
        //     },
        //     arrivalStation: {
        //       include: {
        //         city: true,
        //       },
        //     },
        //   },
        // },
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
        route: {
          include: {
            operator: true,
            departureStation: true,
            arrivalStation: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        route: {
          include: {
            operator: true,
            departureStation: {
              include: {
                city: true,
              },
            },
            arrivalStation: {
              include: {
                city: true,
              },
            },
          },
        },
      },
    });
  }

  async insert(ticketData: CreateTicketDto): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: {
        price: ticketData.price,
        route: {
          connect: {
            id: ticketData.routeId,
          },
        },
      },
      include: {
        route: true,
      },
    });
  }

  async update(id: string, ticketData: UpdateTicketDto): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data: {
        price: ticketData.price,
        route: ticketData.routeId
          ? {
              connect: {
                id: ticketData.routeId,
              },
            }
          : undefined,
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
