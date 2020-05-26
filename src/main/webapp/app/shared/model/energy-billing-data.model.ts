import { Moment } from 'moment';
import { IEnergyType } from 'app/shared/model/energy-type.model';
import { ISite } from 'app/shared/model/site.model';

export interface IEnergyBillingData {
  id?: number;
  startDate?: Moment;
  readDate?: Moment;
  energyConsumption?: number;
  days?: number;
  enrgytype?: IEnergyType;
  site?: ISite;
}

export const defaultValue: Readonly<IEnergyBillingData> = {};
