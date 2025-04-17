import { Injectable } from '@nestjs/common';
import { Route } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { QueryFilter } from './valueObject/filter';
import { Query } from 'src/common/pagination/query';

@Injectable()
export class RouteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByQuery({ skip, take, orderBy, filters }: Query) {
    const { departure, ...rest } = filters;
    const startOfDay = new Date(departure);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(departure);
    endOfDay.setHours(23, 59, 59, 999);

    const [routes, total] = await Promise.all([
      this.prisma.route.findMany({
        where: {
          ...rest,
          departure: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
        include: {
          tickets: true,
          operator: true,
          departureStation: true,
          arrivalStation: true,
        },
        orderBy,
        skip,
        take,
      }),
      this.prisma.route.count({
        where: {
          ...rest,
          departure: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
      }),
    ]);

    return { routes, total };
  }

  async findByDeparture(skip: number, take: number, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [routes, total] = await Promise.all([
      this.prisma.route.findMany({
        where: {
          departure: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
        include: {
          tickets: true,
          operator: true,
          departureStation: true,
          arrivalStation: true,
        },
        orderBy: {
          departure: 'asc',
        },
        skip,
        take,
      }),
      this.prisma.route.count({
        where: {
          departure: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
      }),
    ]);

    return { routes, total };
  }

  async findById(id: string): Promise<Route | null> {
    return this.prisma.route.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        tickets: true,
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async insert(routeData: CreateRouteDto): Promise<Route> {
    const { operatorId, departureStationId, arrivalStationId, ...rest } =
      routeData;
    return this.prisma.route.create({
      data: {
        ...rest,
        operator: {
          connect: { id: operatorId },
        },
        departureStation: {
          connect: { id: departureStationId },
        },
        arrivalStation: {
          connect: { id: arrivalStationId },
        },
      },
      include: {
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async update(id: string, routeData: UpdateRouteDto): Promise<Route> {
    const { operatorId, departureStationId, arrivalStationId, ...rest } =
      routeData;

    const updateData: any = { ...rest };

    if (operatorId) {
      updateData.operator = { connect: { id: operatorId } };
    }

    if (departureStationId) {
      updateData.departureStation = { connect: { id: departureStationId } };
    }

    if (arrivalStationId) {
      updateData.arrivalStation = { connect: { id: arrivalStationId } };
    }

    return this.prisma.route.update({
      where: { id },
      data: updateData,
      include: {
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async deleteById(id: string): Promise<Route> {
    return this.prisma.route.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      include: {
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async findByOriginDestination(
    origin: string,
    destination: string,
  ): Promise<Route[]> {
    return this.prisma.route.findMany({
      where: {
        origin,
        destination,
        deletedAt: null,
      },
      include: {
        tickets: true,
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
      orderBy: {
        departure: 'asc',
      },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Route[]> {
    return this.prisma.route.findMany({
      where: {
        departure: {
          gte: startDate,
          lte: endDate,
        },
        deletedAt: null,
      },
      include: {
        tickets: true,
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
      orderBy: {
        departure: 'asc',
      },
    });
  }

  async findByOperator(operatorId: string): Promise<Route[]> {
    return this.prisma.route.findMany({
      where: {
        operatorId,
        deletedAt: null,
      },
      include: {
        tickets: true,
        operator: true,
        departureStation: true,
        arrivalStation: true,
      },
      orderBy: {
        departure: 'asc',
      },
    });
  }
}
