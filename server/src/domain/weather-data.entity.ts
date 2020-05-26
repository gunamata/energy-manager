/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Site from './site.entity';

/**
 * A WeatherData.
 */
@Entity('weather_data')
export default class WeatherData extends BaseEntity {
  @Column({ type: 'date', name: 'date' })
  date: any;

  @Column({ type: 'double', name: 'average_surface_temparature' })
  averageSurfaceTemparature: number;

  @Column({ type: 'double', name: 'average_surface_dew_point' })
  averageSurfaceDewPoint: number;

  @Column({ type: 'double', name: 'average_surface_wet_bulb_temperature' })
  averageSurfaceWetBulbTemperature: number;

  @ManyToOne(type => Site)
  site: Site;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
