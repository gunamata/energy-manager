import { ICountry } from 'app/shared/model/country.model';

export interface ISite {
  id?: number;
  siteId?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  latitude?: number;
  longitude?: number;
  country?: ICountry;
}

export const defaultValue: Readonly<ISite> = {};
