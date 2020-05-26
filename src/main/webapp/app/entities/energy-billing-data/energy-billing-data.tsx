import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './energy-billing-data.reducer';
import { IEnergyBillingData } from 'app/shared/model/energy-billing-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnergyBillingDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EnergyBillingData = (props: IEnergyBillingDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { energyBillingDataList, match, loading } = props;
  return (
    <div>
      <h2 id="energy-billing-data-heading">
        Energy Billing Data
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Energy Billing Data
        </Link>
      </h2>
      <div className="table-responsive">
        {energyBillingDataList && energyBillingDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>Read Date</th>
                <th>Energy Consumption</th>
                <th>Days</th>
                <th>Enrgytype</th>
                <th>Site</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {energyBillingDataList.map((energyBillingData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${energyBillingData.id}`} color="link" size="sm">
                      {energyBillingData.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={energyBillingData.startDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={energyBillingData.readDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{energyBillingData.energyConsumption}</td>
                  <td>{energyBillingData.days}</td>
                  <td>
                    {energyBillingData.enrgytype ? (
                      <Link to={`energy-type/${energyBillingData.enrgytype.id}`}>{energyBillingData.enrgytype.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{energyBillingData.site ? <Link to={`site/${energyBillingData.site.id}`}>{energyBillingData.site.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${energyBillingData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${energyBillingData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${energyBillingData.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Energy Billing Data found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ energyBillingData }: IRootState) => ({
  energyBillingDataList: energyBillingData.entities,
  loading: energyBillingData.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnergyBillingData);
