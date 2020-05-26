import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WeatherData from './weather-data';
import WeatherDataDetail from './weather-data-detail';
import WeatherDataUpdate from './weather-data-update';
import WeatherDataDeleteDialog from './weather-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WeatherDataDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WeatherDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WeatherDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WeatherDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={WeatherData} />
    </Switch>
  </>
);

export default Routes;
