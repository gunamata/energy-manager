import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import EnergyBillingData from '../../domain/energy-billing-data.entity';
import { EnergyBillingDataService } from '../../service/energy-billing-data.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/energy-billing-data')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('energy-billing-data')
export class EnergyBillingDataController {
  logger = new Logger('EnergyBillingDataController');

  constructor(private readonly energyBillingDataService: EnergyBillingDataService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EnergyBillingData
  })
  async getAll(@Req() req: Request): Promise<EnergyBillingData[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.energyBillingDataService.findAndCount({
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
    type: EnergyBillingData
  })
  async getOne(@Param('id') id: string): Promise<EnergyBillingData> {
    return await this.energyBillingDataService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create energyBillingData' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EnergyBillingData
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() energyBillingData: EnergyBillingData): Promise<EnergyBillingData> {
    const created = await this.energyBillingDataService.save(energyBillingData);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EnergyBillingData', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update energyBillingData' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EnergyBillingData
  })
  async put(@Req() req: Request, @Body() energyBillingData: EnergyBillingData): Promise<EnergyBillingData> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EnergyBillingData', energyBillingData.id);
    return await this.energyBillingDataService.update(energyBillingData);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete energyBillingData' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<EnergyBillingData> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'EnergyBillingData', id);
    const toDelete = await this.energyBillingDataService.findById(id);
    return await this.energyBillingDataService.delete(toDelete);
  }
}
