import { EntityRepository, Repository } from 'typeorm';
import EnergyBillingData from '../domain/energy-billing-data.entity';

@EntityRepository(EnergyBillingData)
export class EnergyBillingDataRepository extends Repository<EnergyBillingData> {}
