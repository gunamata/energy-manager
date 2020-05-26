import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import EnergyBillingData from '../domain/energy-billing-data.entity';
import { EnergyBillingDataRepository } from '../repository/energy-billing-data.repository';

const relationshipNames = [];
relationshipNames.push('enrgytype');
relationshipNames.push('site');

@Injectable()
export class EnergyBillingDataService {
  logger = new Logger('EnergyBillingDataService');

  constructor(@InjectRepository(EnergyBillingDataRepository) private energyBillingDataRepository: EnergyBillingDataRepository) {}

  async findById(id: string): Promise<EnergyBillingData | undefined> {
    const options = { relations: relationshipNames };
    return await this.energyBillingDataRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<EnergyBillingData>): Promise<EnergyBillingData | undefined> {
    return await this.energyBillingDataRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<EnergyBillingData>): Promise<[EnergyBillingData[], number]> {
    options.relations = relationshipNames;
    return await this.energyBillingDataRepository.findAndCount(options);
  }

  async save(energyBillingData: EnergyBillingData): Promise<EnergyBillingData | undefined> {
    return await this.energyBillingDataRepository.save(energyBillingData);
  }

  async update(energyBillingData: EnergyBillingData): Promise<EnergyBillingData | undefined> {
    return await this.save(energyBillingData);
  }

  async delete(energyBillingData: EnergyBillingData): Promise<EnergyBillingData | undefined> {
    return await this.energyBillingDataRepository.remove(energyBillingData);
  }
}
