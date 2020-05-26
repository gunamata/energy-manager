import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import WeatherData from '../domain/weather-data.entity';
import { WeatherDataRepository } from '../repository/weather-data.repository';

const relationshipNames = [];
relationshipNames.push('site');

@Injectable()
export class WeatherDataService {
  logger = new Logger('WeatherDataService');

  constructor(@InjectRepository(WeatherDataRepository) private weatherDataRepository: WeatherDataRepository) {}

  async findById(id: string): Promise<WeatherData | undefined> {
    const options = { relations: relationshipNames };
    return await this.weatherDataRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<WeatherData>): Promise<WeatherData | undefined> {
    return await this.weatherDataRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<WeatherData>): Promise<[WeatherData[], number]> {
    options.relations = relationshipNames;
    return await this.weatherDataRepository.findAndCount(options);
  }

  async save(weatherData: WeatherData): Promise<WeatherData | undefined> {
    return await this.weatherDataRepository.save(weatherData);
  }

  async update(weatherData: WeatherData): Promise<WeatherData | undefined> {
    return await this.save(weatherData);
  }

  async delete(weatherData: WeatherData): Promise<WeatherData | undefined> {
    return await this.weatherDataRepository.remove(weatherData);
  }
}
