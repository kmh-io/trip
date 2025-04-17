import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Route } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { CreateRouteDto } from './dto/create-route.dto';
import { QueryDTO } from './dto/query.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteRepository } from './route.repository';
import { QueryFilter } from './valueObject/filter';
import { transportTypeMap } from './valueObject/transport-type';
import { toValidQuery } from 'src/common/pagination/query';

@Injectable()
export class RouteService {
  private readonly logger = new Logger(RouteService.name, { timestamp: true });

  constructor(private readonly routeRepo: RouteRepository) {}

  private durationInMinutes(departure: Date, arrival: Date): number {
    return Math.floor((arrival.getTime() - departure.getTime()) / (1000 * 60));
  }

  private validate(route: CreateRouteDto) {
    return route.arrival.getTime() > route.departure.getTime();
  }

  async create(route: CreateRouteDto) {
    if (!this.validate(route)) {
      throw new BadRequestException(
        'Arrival time must be greater than departure time',
      );
    }

    route.duration = this.durationInMinutes(route.departure, route.arrival);
    try {
      const newRoute = await this.routeRepo.insert(route);
      return successJsonResponse({
        data: newRoute,
        message: 'New route is successfully created',
      });
    } catch (error) {
      this.logger.error(error);

      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Invaild route data');
      }

      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async findByQuery(queryDTO: QueryDTO) {
    if (queryDTO.transportType) {
      queryDTO.transportType = transportTypeMap[queryDTO.transportType];
    }
    const query = toValidQuery(queryDTO, new QueryFilter());
    const { routes, total } = await this.routeRepo.findByQuery(query);

    return successJsonResponse({
      data: routes,
      message: `${query.filters.transportType} Routes are successfully fetched.`,
      limit: query.take,
      page: query.page,
      total,
    });
  }

  async findById(id: string) {
    const route = await this.routeRepo.findById(id);
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return successJsonResponse({
      data: route,
      message: 'Route is successfully fetched',
    });
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    const existingRoute = await this.routeRepo.findById(id);
    if (!existingRoute) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    if (updateRouteDto.departure || updateRouteDto.arrival) {
      updateRouteDto.departure =
        updateRouteDto.departure ?? existingRoute.departure;
      updateRouteDto.arrival = updateRouteDto.arrival ?? existingRoute.arrival;

      if (!this.validate(existingRoute)) {
        throw new BadRequestException(
          'Arrival time must be greater than departure time',
        );

        updateRouteDto.duration = this.durationInMinutes(
          updateRouteDto.departure as Date,
          updateRouteDto.arrival as Date,
        );
      }
    }

    try {
      const updatedRoute = await this.routeRepo.update(id, updateRouteDto);
      return successJsonResponse({
        data: { id: updatedRoute.id },
        message: 'Route updated successfully',
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid route data');
      }
      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async deleteById(id: string) {
    const existingRoute = await this.routeRepo.findById(id);
    if (!existingRoute) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    try {
      const deletedRoute = await this.routeRepo.deleteById(id);
      return successJsonResponse({
        data: { id: deletedRoute.id },
        message: 'Route deleted successfully',
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
