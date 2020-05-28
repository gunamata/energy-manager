/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import EnergyType from './energy-type.entity';
import Site from './site.entity';

/**
 * A EnergyBillingData.
 */
@Entity('energy_billing_data')
export default class EnergyBillingData extends BaseEntity {
  @Column({ type: 'date', name: 'start_date' })
  startDate: any;

  @Column({ type: 'date', name: 'read_date' })
  readDate: any;

  @Column({ type: 'numeric', name: 'energy_consumption' })
  energyConsumption: number;

  @Column({ type: 'integer', name: 'days' })
  days: number;

  @ManyToOne(type => EnergyType)
  enrgytype: EnergyType;

  @ManyToOne(type => Site)
  site: Site;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
