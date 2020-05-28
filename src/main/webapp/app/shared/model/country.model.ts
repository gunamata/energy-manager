import { IRegion } from 'app/shared/model/region.model';
import { ISite } from 'app/shared/model/site.model';

export interface ICountry {
  id?: number;
  countryName?: string;
  region?: IRegion;
  site?: ISite;
}

export const defaultValue: Readonly<ICountry> = {};
