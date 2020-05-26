import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyBillingDataController } from '../web/rest/energy-billing-data.controller';
import { EnergyBillingDataRepository } from '../repository/energy-billing-data.repository';
import { EnergyBillingDataService } from '../service/energy-billing-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnergyBillingDataRepository])],
  controllers: [EnergyBillingDataController],
  providers: [EnergyBillingDataService],
  exports: [EnergyBillingDataService]
})
export class EnergyBillingDataModule {}
