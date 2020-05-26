import { Moment } from 'moment';
import { ISite } from 'app/shared/model/site.model';

export interface IWeatherData {
  id?: number;
  date?: Moment;
  averageSurfaceTemparature?: number;
  averageSurfaceDewPoint?: number;
  averageSurfaceWetBulbTemperature?: number;
  site?: ISite;
}

export const defaultValue: Readonly<IWeatherData> = {};
