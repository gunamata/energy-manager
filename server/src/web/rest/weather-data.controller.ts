import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import WeatherData from '../../domain/weather-data.entity';
import { WeatherDataService } from '../../service/weather-data.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/weather-data')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('weather-data')
export class WeatherDataController {
  logger = new Logger('WeatherDataController');

  constructor(private readonly weatherDataService: WeatherDataService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: WeatherData
  })
  async getAll(@Req() req: Request): Promise<WeatherData[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.weatherDataService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: WeatherData
  })
  async getOne(@Param('id') id: string): Promise<WeatherData> {
    return await this.weatherDataService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create weatherData' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: WeatherData
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() weatherData: WeatherData): Promise<WeatherData> {
    const created = await this.weatherDataService.save(weatherData);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WeatherData', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update weatherData' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: WeatherData
  })
  async put(@Req() req: Request, @Body() weatherData: WeatherData): Promise<WeatherData> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'WeatherData', weatherData.id);
    return await this.weatherDataService.update(weatherData);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete weatherData' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<WeatherData> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'WeatherData', id);
    const toDelete = await this.weatherDataService.findById(id);
    return await this.weatherDataService.delete(toDelete);
  }
}
