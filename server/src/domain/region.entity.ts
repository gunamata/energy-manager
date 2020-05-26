/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';

/**
 * A Region.
 */
@Entity('region')
export default class Region extends BaseEntity {
  @Column({ name: 'region_name' })
  regionName: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
