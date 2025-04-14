import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { toValidQuery } from 'src/common/pagination/query';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { QueryDTO } from './dto/query.dto';
import { Filter } from './value-object/filter';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name, { timestamp: true });

  constructor(private readonly cityRepo: CityRepository) {}

  async create(createCityDto: CreateCityDto) {
    const existingCity = await this.cityRepo.findByName(createCityDto.name);
    if (existingCity) {
      throw new ConflictException(`${createCityDto.name} already exists`);
    }

    try {
      const newCity = await this.cityRepo.insert(createCityDto);

      return successJsonResponse({
        data: {
          id: newCity.id,
          name: newCity.name,
        },
        message: 'City is successfully created',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async findAll(queryDTO: QueryDTO) {
    try {
      const query = toValidQuery(queryDTO, new Filter());
      const { cities, total } = await this.cityRepo.findByQuery(query);

      return successJsonResponse({
        data: cities,
        message: 'Cities are successfully fetched',
        limit: query.take,
        page: query.page,
        total,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async findById(id: string) {
    const city = await this.cityRepo.findById(id);
    if (!city) {
      throw new NotFoundException('City does not exist');
    }

    return successJsonResponse({
      data: city,
      message: 'City is successfully fetched.',
    });
  }

  async update(id: string, updateCityDto: CreateCityDto) {
    let city = await this.cityRepo.findByName(updateCityDto.name);
    if (city) {
      throw new ConflictException(
        `City with name ${updateCityDto.name} already exists`,
      );
    }

    city = await this.cityRepo.findById(id);
    if (!city) {
      throw new NotFoundException('City does not exist');
    }

    try {
      const updatedCity = await this.cityRepo.update(id, updateCityDto);
      return successJsonResponse({
        data: updatedCity,
        message: 'City is successfully updated.',
      });
    } catch (error) {
      this.logger.error(error);

      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('City already exists');
      }

      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async deleteById(id: string) {
    const city = await this.cityRepo.findById(id);
    if (!city) {
      throw new NotFoundException('City does not exist');
    }

    const name = city.name + ' ' + city.id;
    const deletedCity = await this.cityRepo.deleteById(id, name);
    if (deletedCity === null) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    deletedCity.name = city.name;

    return successJsonResponse({
      data: {
        id: deletedCity.id,
        name: deletedCity.name,
      },
      message: 'City is successfully deleted',
    });
  }
}
