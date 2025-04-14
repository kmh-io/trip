import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { OperatorRepository } from './operator.repository';
import { Filter } from './value-object/filter';
import { toValidQuery } from 'src/common/pagination/query';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class OperatorService {
  private readonly logger = new Logger(OperatorService.name, {
    timestamp: true,
  });
  constructor(private readonly operatorRepo: OperatorRepository) {}

  async create(operator: CreateOperatorDto) {
    const existingOperator = await this.operatorRepo.findByName(operator.name);
    if (existingOperator) {
      throw new ConflictException(
        `Operator name ${operator.name} already exists`,
      );
    }

    try {
      const newOperator = await this.operatorRepo.insert(operator);
      return successJsonResponse({
        data: { id: newOperator.id },
        message: 'Operator is successfully created',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Something went wrong: Failed to create operator ${operator.name}`,
      );
    }
  }

  async findAll(queryDTO: QueryDTO) {
    const query = toValidQuery(queryDTO, new Filter());
    const { operators, total } = await this.operatorRepo.findByQuery(query);

    return successJsonResponse({
      data: operators,
      message: 'Operators are successfully fetched',
      total,
      limit: query.take,
      page: query.page,
    });
  }

  async findById(id: string) {
    const operator = await this.operatorRepo.findById(id);
    if (operator === null) {
      throw new NotFoundException(`Operater with ${id} does not exits`);
    }

    return successJsonResponse({
      data: operator,
      message: 'Operater is successfully fetched',
    });
  }

  async update(id: string, { name }: CreateOperatorDto) {
    let existingOperator = await this.operatorRepo.findById(id);
    if (!existingOperator) {
      throw new NotFoundException("Operator doesn't exist");
    }

    if (existingOperator.name == name) {
      throw new BadRequestException(`Operator name must not be the same`);
    }

    existingOperator = await this.operatorRepo.findByName(name);
    if (existingOperator) {
      throw new ConflictException(`Operator ${name} already exists`);
    }

    try {
      await this.operatorRepo.update(id, { name });
      return successJsonResponse({
        data: null,
        message: 'Operator is successfully updated.',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Something went wrong: Failed to update operator',
      );
    }
  }

  async deleteById(id: string) {
    const existingOperator = await this.operatorRepo.findById(id);
    if (!existingOperator) {
      throw new NotFoundException("Operator doesn't exist");
    }

    try {
      const name = existingOperator.name + ' ' + id;
      await this.operatorRepo.deleteById(id, name);
      return successJsonResponse({
        data: null,
        message: 'Operator is successfully deleted',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Something went wrong: Failed to delete operator',
      );
    }
  }
}
