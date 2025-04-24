import { Injectable } from '@nestjs/common';
import { Query } from 'src/common/pagination/query';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Injectable()
export class StationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert({ name, cityId }: CreateStationDto) {
    return this.prisma.station.create({
      data: { name, cityId },
    });
  }

  async findByQuery({ take, skip, filters, orderBy }: Query) {
    const [stations, total] = await Promise.all([
      this.prisma.station.findMany({
        where: {
          ...filters,
          deletedAt: null,
        },
        orderBy,
        take,
        skip,
      }),
      this.prisma.station.count({
        where: {
          ...filters,
          deletedAt: null,
        },
      }),
    ]);

    return { stations, total };
  }

  async findById(id: string) {
    return this.prisma.station.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        city: true,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.station.findFirst({
      where: {
        name,
        deletedAt: null,
      },
    });
  }

  async update(id: string, station: UpdateStationDto) {
    return this.prisma.station.update({
      where: { id },
      data: {
        ...station,
      },
    });
  }

  async deleteById(id: string, name: string) {
    return this.prisma.station.update({
      where: { id },
      data: {
        name,
        deletedAt: new Date(),
      },
    });
  }
}
