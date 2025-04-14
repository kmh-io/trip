import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { Query } from 'src/common/pagination/query';

@Injectable()
export class OperatorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insert({ name }: CreateOperatorDto) {
    return this.prisma.operator.create({
      data: { name },
    });
  }

  async findByQuery({ take, skip, filters, orderBy }: Query) {
    const [operators, total] = await Promise.all([
      this.prisma.operator.findMany({
        where: {
          ...filters,
          deletedAt: null,
        },
        orderBy,
        take,
        skip,
      }),
      this.prisma.operator.count({
        where: {
          ...filters,
          deletedAt: null,
        },
      }),
    ]);

    return { operators, total };
  }

  async findById(id: string) {
    return this.prisma.operator.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.operator.findUnique({
      where: {
        name,
        deletedAt: null,
      },
    });
  }

  async update(id: string, operator: CreateOperatorDto) {
    return this.prisma.operator.update({
      where: { id },
      data: {
        ...operator,
      },
    });
  }

  async deleteById(id: string, name: string) {
    return this.prisma.operator.update({
      where: { id },
      data: {
        name,
        deletedAt: new Date(),
      },
    });
  }
}
