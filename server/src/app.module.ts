import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { RegionModule } from './module/region.module';
import { CountryModule } from './module/country.module';
import { SiteModule } from './module/site.module';
import { EnergyTypeModule } from './module/energy-type.module';
import { EnergyBillingDataModule } from './module/energy-billing-data.module';
import { WeatherDataModule } from './module/weather-data.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    RegionModule,
    CountryModule,
    SiteModule,
    EnergyTypeModule,
    EnergyBillingDataModule,
    WeatherDataModule
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ]
})
export class AppModule {}