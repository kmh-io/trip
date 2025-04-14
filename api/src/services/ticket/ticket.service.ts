import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketRepository } from './ticket.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { successJsonResponse } from 'src/common/utils/json-responst';
import { RouteService } from 'src/services/route/route.service';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name, { timestamp: true });

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly routeService: RouteService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const newTicket = await this.ticketRepo.insert(createTicketDto);
      return successJsonResponse({
        data: { id: newTicket.id },
        message: 'New ticket is successfully created',
      });
    } catch (error) {
      this.logger.error(error);

      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid ticket data');
      }

      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async findAll(queryDTO: QueryDTO) {
    try {
      // const query = new BaseQuery<QueryFilter>(queryDTO, new QueryFilter());
      // const tickets = await this.ticketRepo.findAllByQuery(query);

      const resp = await this.routeService.findByQuery(queryDTO);

      return successJsonResponse({
        ...resp,
        message: `${queryDTO.transportType} tickets are successfully fetched`,
        limit: queryDTO.limit,
        page: queryDTO.page,
        total: resp.meta.total,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async findById(id: string) {
    const ticket = await this.ticketRepo.findById(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return successJsonResponse({
      data: ticket,
      message: 'Ticket is successfully fetched',
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const existingTicket = await this.ticketRepo.findById(id);
    if (!existingTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    try {
      const updatedTicket = await this.ticketRepo.update(id, updateTicketDto);
      return successJsonResponse({
        data: { id: updatedTicket.id },
        message: 'Ticket updated successfully',
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid ticket data');
      }
      throw new InternalServerErrorException('Something went wrong!!');
    }
  }

  async deleteById(id: string) {
    const existingTicket = await this.ticketRepo.findById(id);
    if (!existingTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    try {
      const deletedTicket = await this.ticketRepo.deleteById(id);
      return successJsonResponse({
        data: { id: deletedTicket.id },
        message: 'Ticket deleted successfully',
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
