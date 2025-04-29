import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { toValidQuery } from 'src/common/pagination/query';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { entityToDto } from '../../common/utils/entity-to-dto';
import { OperatorRepository } from '../operator/operator.repository';
import { StationRepository } from '../station/station.repository';
import { CreateRouteDto } from './dto/create-route.dto';
import FindByIdRouteDto from './dto/find-by-id-route.dto';
import { QueryDTO } from './dto/query.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteRepository } from './route.repository';
import { QueryFilter } from './valueObject/filter';
import { transportTypeMap } from './valueObject/transport-type';

@Injectable()
export class RouteService {
  private readonly logger = new Logger(RouteService.name, { timestamp: true });

  constructor(
    private readonly routeRepo: RouteRepository,
    private readonly stationRepo: StationRepository,
    private readonly operatorRepo: OperatorRepository,
  ) {}

  private durationInMinutes(departure: Date, arrival: Date): number {
    return Math.floor((arrival.getTime() - departure.getTime()) / (1000 * 60));
  }

  private async validate(route: CreateRouteDto) {
    if (route.arrival.getTime() <= route.departure.getTime()) {
      throw new BadRequestException(
        'Arrival time must be greater than departure time',
      );
    }

    const [operator, departureStation, arrivalStation] = await Promise.all([
      this.operatorRepo.findById(route.operatorId),
      this.stationRepo.findById(route.departureStationId),
      this.stationRepo.findById(route.arrivalStationId),
    ]);

    if (!operator) throw new BadRequestException('Operator not found');
    if (!departureStation)
      throw new BadRequestException('Departure station not found');
    if (!arrivalStation)
      throw new BadRequestException('Arrival station not found');

    route.duration = this.durationInMinutes(route.departure, route.arrival);
    route.origin = departureStation.city.name;
    route.destination = arrivalStation.city.name;
  }

  async create(route: CreateRouteDto) {
    try {
      await this.validate(route);
      const newRoute = await this.routeRepo.insert(route);
      return successJsonResponse({
        data: newRoute,
        message: 'New route is successfully created',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid route data');
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
    let route: null | object = null;
    try {
      route = await this.routeRepo.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong!!!');
    }

    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    return successJsonResponse({
      data: entityToDto(route, new FindByIdRouteDto()),
      message: 'Route is successfully fetched',
    });
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    const existingRoute = await this.routeRepo.findById(id);
    if (!existingRoute) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    try {
      updateRouteDto.arrival ??= existingRoute.arrival;
      updateRouteDto.departure ??= existingRoute.departure;
      updateRouteDto.transportType ??= existingRoute.transportType;
      updateRouteDto.operatorId ??= existingRoute.operatorId;
      updateRouteDto.arrivalStationId ??= existingRoute.arrivalStationId;
      updateRouteDto.departureStationId ??= existingRoute.departureStationId;
      await this.validate(updateRouteDto as CreateRouteDto);
      const updatedRoute = await this.routeRepo.update(id, updateRouteDto);
      return successJsonResponse({
        data: { id: updatedRoute.id },
        message: 'Route is successfully updated',
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
