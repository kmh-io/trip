import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRouteDto } from './dto/create-route.dto';
import { QueryDTO } from './dto/query.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteService } from './route.service';

@ApiTags('Routes')
@Controller('api/v1/routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new route' })
  @ApiResponse({ status: 201, description: 'Route created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all routes with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Returns a list of routes' })
  findAll(@Query() query: QueryDTO) {
    return this.routeService.findByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a route by ID' })
  @ApiParam({ name: 'id', description: 'Route ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns a route' })
  @ApiResponse({ status: 404, description: 'Route not found' })
  findOne(@Param('id') id: string) {
    return this.routeService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a route' })
  @ApiParam({ name: 'id', description: 'Route ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Route updated successfully' })
  @ApiResponse({ status: 404, description: 'Route not found' })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(id, updateRouteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a route' })
  @ApiParam({ name: 'id', description: 'Route ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Route deleted successfully' })
  @ApiResponse({ status: 404, description: 'Route not found' })
  remove(@Param('id') id: string) {
    return this.routeService.deleteById(id);
  }
}
