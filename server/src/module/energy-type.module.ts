import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyTypeController } from '../web/rest/energy-type.controller';
import { EnergyTypeRepository } from '../repository/energy-type.repository';
import { EnergyTypeService } from '../service/energy-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnergyTypeRepository])],
  controllers: [EnergyTypeController],
  providers: [EnergyTypeService],
  exports: [EnergyTypeService]
})
export class EnergyTypeModule {}
