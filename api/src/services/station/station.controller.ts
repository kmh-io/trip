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
import { CreateStationDto } from './dto/create-station.dto';
import { QueryDTO } from './dto/query.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationService } from './station.service';

@ApiTags('Stations')
@Controller('api/v1/stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new station',
    description: 'Creates a new station with the provided data',
  })
  @ApiOkResponse({
    description: 'Station successfully created',
    schema: {
      example: {
        message: 'Station is successfully created',
        success: true,
        data: null,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid station data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.create(createStationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all stations',
    description:
      'Retrieves a list of stations based on the provided query parameters',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved stations',
    schema: {
      example: {
        message: 'Stations are successfully fetched',
        success: true,
        data: [
          {
            id: '1',
            name: 'Station 1',
            cityId: '1',
            city: {
              id: '1',
              name: 'City 1',
            },
            createdAt: '2024-03-20T10:00:00Z',
            updatedAt: '2024-03-20T10:00:00Z',
          },
        ],
        limit: 10,
        total: 20,
        page: 1,
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
    return this.stationService.findByQuery(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a station by ID',
    description: 'Retrieves a station by its ID',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved station',
    schema: {
      example: {
        message: 'Station is successfully fetched',
        success: true,
        data: {
          id: '1',
          name: 'Station 1',
          cityId: '1',
          city: {
            id: '1',
            name: 'City 1',
          },
          createdAt: '2024-03-20T10:00:00Z',
          updatedAt: '2024-03-20T10:00:00Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid station ID',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.stationService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a station',
    description: 'Updates a station with the provided data',
  })
  @ApiOkResponse({
    description: 'Station successfully updated',
    schema: {
      example: {
        message: 'Station is successfully updated',
        success: true,
        data: null,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid station data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStationDto: UpdateStationDto,
  ) {
    return this.stationService.update(id, updateStationDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a station',
    description: 'Deletes a station by its ID',
  })
  @ApiOkResponse({
    description: 'Station successfully deleted',
    schema: {
      example: {
        message: 'Station is successfully deleted',
        success: true,
        data: null,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid station ID',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.stationService.deleteById(id);
  }
}
