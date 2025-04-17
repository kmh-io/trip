import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryDTO } from './dto/query.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationRepository } from './station.repository';
import { QueryFilter } from './value-object/filter';
import { CityService } from 'src/services/city/city.service';
import { toValidQuery } from 'src/common/pagination/query';

@Injectable()
export class StationService {
  private readonly logger = new Logger(StationService.name, {
    timestamp: true,
  });

  constructor(
    private readonly stationRepo: StationRepository,
    private readonly cityService: CityService,
  ) {}

  async create(createStationDto: CreateStationDto) {
    const existingStation = await this.stationRepo.findByName(
      createStationDto.name,
    );
    if (existingStation && existingStation.cityId === createStationDto.cityId) {
      throw new ConflictException(
        `Station name ${createStationDto.name} already exists`,
      );
    }

    try {
      await this.cityService.findById(createStationDto.cityId);
      const newStation = await this.stationRepo.insert(createStationDto);
      return successJsonResponse({
        data: {
          id: newStation.id,
          name: newStation.name,
        },
        message: 'Station is successfully created',
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'Something went wrong: Failed to create station',
      );
    }
  }

  async findByQuery(queryDTO: QueryDTO) {
    const query = toValidQuery(queryDTO, new QueryFilter());
    const { stations, total } = await this.stationRepo.findByQuery(query);

    if (stations === null) {
      throw new InternalServerErrorException('Something went wrong!');
    }

    return successJsonResponse({
      data: stations,
      message: 'Stations are successfully fetched',
      limit: query.take,
      page: query.page,
      total,
    });
  }

  async findById(id: string) {
    const station = await this.stationRepo.findById(id);

    if (station === null) {
      throw new NotFoundException(`Station with ${id} does not exist`);
    }

    return successJsonResponse({
      data: station,
      message: 'Station is successfully fetched',
    });
  }

  async update(id: string, updateStationDto: UpdateStationDto) {
    let existingStation = await this.stationRepo.findById(id);
    if (!existingStation) {
      throw new NotFoundException("Station doesn't exist");
    }
    if (existingStation.name === updateStationDto.name) {
      throw new BadRequestException(`Station name must not be the same`);
    }

    existingStation = await this.stationRepo.findByName(updateStationDto.name);
    if (existingStation) {
      throw new ConflictException(
        `Station ${updateStationDto.name} already exists`,
      );
    }

    try {
      const updatedStation = await this.stationRepo.update(
        id,
        updateStationDto,
      );

      return successJsonResponse({
        data: {
          id: updatedStation.id,
          name: updatedStation.name,
        },
        message: 'Station is successfully updated.',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Something went wrong: Failed to update station',
      );
    }
  }

  async deleteById(id: string) {
    const existingStation = await this.stationRepo.findById(id);
    if (!existingStation) {
      throw new NotFoundException("Station doesn't exist");
    }

    try {
      const name = existingStation.name + existingStation.id;
      const deletedStation = await this.stationRepo.deleteById(id, name);
      return successJsonResponse({
        data: {
          id: deletedStation.id,
          name: deletedStation.name,
        },
        message: 'Station is successfully deleted',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Something went wrong: Failed to delete station',
      );
    }
  }
}
