/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';

import Country from './country.entity';

/**
 * A Site.
 */
@Entity('site')
export default class Site extends BaseEntity {
  @Column({ type: 'long', name: 'site_id' })
  siteId: number;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'state_province' })
  stateProvince: string;

  @Column({ type: 'long', name: 'latitude' })
  latitude: number;

  @Column({ type: 'long', name: 'longitude' })
  longitude: number;

  @OneToOne(
    type => Country,
    other => other.site
  )
  @JoinColumn()
  country: Country;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
