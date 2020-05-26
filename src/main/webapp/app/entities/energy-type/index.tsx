import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EnergyType from './energy-type';
import EnergyTypeDetail from './energy-type-detail';
import EnergyTypeUpdate from './energy-type-update';
import EnergyTypeDeleteDialog from './energy-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EnergyTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnergyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnergyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnergyTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={EnergyType} />
    </Switch>
  </>
);

export default Routes;
