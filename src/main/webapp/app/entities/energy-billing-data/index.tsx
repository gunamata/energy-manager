import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EnergyBillingData from './energy-billing-data';
import EnergyBillingDataDetail from './energy-billing-data-detail';
import EnergyBillingDataUpdate from './energy-billing-data-update';
import EnergyBillingDataDeleteDialog from './energy-billing-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EnergyBillingDataDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnergyBillingDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnergyBillingDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnergyBillingDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={EnergyBillingData} />
    </Switch>
  </>
);

export default Routes;
