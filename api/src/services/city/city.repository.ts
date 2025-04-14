import { Injectable } from '@nestjs/common';
import { Query } from 'src/common/pagination/query';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert({ name }: CreateCityDto) {
    return this.prisma.city.create({
      data: { name },
    });
  }

  async findByQuery({ take, skip, orderBy, filters }: Query) {
    const [cities, total] = await Promise.all([
      this.prisma.city.findMany({
        where: {
          ...filters,
          deletedAt: null,
        },
        orderBy,
        take,
        skip,
      }),
      this.prisma.city.count({
        where: {
          ...filters,
          deletedAt: null,
        },
      }),
    ]);

    return { cities, total };
  }

  async findById(id: string) {
    return this.prisma.city.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.city.findUnique({
      where: {
        name,
        deletedAt: null,
      },
    });
  }

  async update(id: string, city: UpdateCityDto) {
    return this.prisma.city.update({
      where: { id, deletedAt: null },
      data: {
        ...city,
      },
    });
  }

  async deleteById(id: string, name: string) {
    return this.prisma.city.update({
      where: { id },
      data: {
        name,
        deletedAt: new Date(),
      },
    });
  }
}
