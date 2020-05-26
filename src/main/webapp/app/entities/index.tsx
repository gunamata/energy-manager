import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Region from './region';
import Country from './country';
import Site from './site';
import EnergyType from './energy-type';
import EnergyBillingData from './energy-billing-data';
import WeatherData from './weather-data';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}region`} component={Region} />
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}site`} component={Site} />
      <ErrorBoundaryRoute path={`${match.url}energy-type`} component={EnergyType} />
      <ErrorBoundaryRoute path={`${match.url}energy-billing-data`} component={EnergyBillingData} />
      <ErrorBoundaryRoute path={`${match.url}weather-data`} component={WeatherData} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
