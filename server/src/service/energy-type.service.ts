import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import EnergyType from '../domain/energy-type.entity';
import { EnergyTypeRepository } from '../repository/energy-type.repository';

const relationshipNames = [];

@Injectable()
export class EnergyTypeService {
  logger = new Logger('EnergyTypeService');

  constructor(@InjectRepository(EnergyTypeRepository) private energyTypeRepository: EnergyTypeRepository) {}

  async findById(id: string): Promise<EnergyType | undefined> {
    const options = { relations: relationshipNames };
    return await this.energyTypeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<EnergyType>): Promise<EnergyType | undefined> {
    return await this.energyTypeRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<EnergyType>): Promise<[EnergyType[], number]> {
    options.relations = relationshipNames;
    return await this.energyTypeRepository.findAndCount(options);
  }

  async save(energyType: EnergyType): Promise<EnergyType | undefined> {
    return await this.energyTypeRepository.save(energyType);
  }

  async update(energyType: EnergyType): Promise<EnergyType | undefined> {
    return await this.save(energyType);
  }

  async delete(energyType: EnergyType): Promise<EnergyType | undefined> {
    return await this.energyTypeRepository.remove(energyType);
  }
}
