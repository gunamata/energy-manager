import { EntityRepository, Repository } from 'typeorm';
import EnergyType from '../domain/energy-type.entity';

@EntityRepository(EnergyType)
export class EnergyTypeRepository extends Repository<EnergyType> {}
