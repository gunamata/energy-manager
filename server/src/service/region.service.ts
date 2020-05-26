import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Region from '../domain/region.entity';
import { RegionRepository } from '../repository/region.repository';

const relationshipNames = [];

@Injectable()
export class RegionService {
  logger = new Logger('RegionService');

  constructor(@InjectRepository(RegionRepository) private regionRepository: RegionRepository) {}

  async findById(id: string): Promise<Region | undefined> {
    const options = { relations: relationshipNames };
    return await this.regionRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Region>): Promise<Region | undefined> {
    return await this.regionRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Region>): Promise<[Region[], number]> {
    options.relations = relationshipNames;
    return await this.regionRepository.findAndCount(options);
  }

  async save(region: Region): Promise<Region | undefined> {
    return await this.regionRepository.save(region);
  }

  async update(region: Region): Promise<Region | undefined> {
    return await this.save(region);
  }

  async delete(region: Region): Promise<Region | undefined> {
    return await this.regionRepository.remove(region);
  }
}
