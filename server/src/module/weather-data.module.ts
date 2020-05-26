import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherDataController } from '../web/rest/weather-data.controller';
import { WeatherDataRepository } from '../repository/weather-data.repository';
import { WeatherDataService } from '../service/weather-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherDataRepository])],
  controllers: [WeatherDataController],
  providers: [WeatherDataService],
  exports: [WeatherDataService]
})
export class WeatherDataModule {}
