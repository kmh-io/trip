import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { OperatorResponse } from './dto/operator.response.dto';
import { QueryDTO } from './dto/query.dto';
import { OperatorService } from './operator.service';

@ApiTags('Operators')
@Controller('api/v1/operators')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post()
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorService.create(createOperatorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all operators',
    description:
      'Retrieves a list of operators based on the provided query parameters',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved operators',
    type: Array<OperatorResponse>,
    schema: {
      example: {
        message: 'Operations are successfully fetched',
        success: true,
        data: [
          {
            id: '1',
            name: 'Operator 1',
            createdAt: '2024-03-20T10:00:00Z',
            updatedAt: '2024-03-20T10:00:00Z',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 20,
          totalPage: 2,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  findAll(@Query() query: QueryDTO) {
    return this.operatorService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.operatorService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOperatorDto: CreateOperatorDto,
  ) {
    return this.operatorService.update(id, updateOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.operatorService.deleteById(id);
  }
}
