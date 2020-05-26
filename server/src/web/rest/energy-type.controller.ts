import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import EnergyType from '../../domain/energy-type.entity';
import { EnergyTypeService } from '../../service/energy-type.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/energy-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('energy-types')
export class EnergyTypeController {
  logger = new Logger('EnergyTypeController');

  constructor(private readonly energyTypeService: EnergyTypeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EnergyType
  })
  async getAll(@Req() req: Request): Promise<EnergyType[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.energyTypeService.findAndCount({
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
    type: EnergyType
  })
  async getOne(@Param('id') id: string): Promise<EnergyType> {
    return await this.energyTypeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create energyType' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EnergyType
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() energyType: EnergyType): Promise<EnergyType> {
    const created = await this.energyTypeService.save(energyType);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EnergyType', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update energyType' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EnergyType
  })
  async put(@Req() req: Request, @Body() energyType: EnergyType): Promise<EnergyType> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EnergyType', energyType.id);
    return await this.energyTypeService.update(energyType);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete energyType' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<EnergyType> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'EnergyType', id);
    const toDelete = await this.energyTypeService.findById(id);
    return await this.energyTypeService.delete(toDelete);
  }
}
