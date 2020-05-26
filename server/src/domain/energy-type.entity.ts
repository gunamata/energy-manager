/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';

/**
 * A EnergyType.
 */
@Entity('energy_type')
export default class EnergyType extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
