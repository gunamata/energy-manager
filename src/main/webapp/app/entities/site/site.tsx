import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './site.reducer';
import { ISite } from 'app/shared/model/site.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISiteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Site = (props: ISiteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { siteList, match, loading } = props;
  return (
    <div>
      <h2 id="site-heading">
        Sites
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Site
        </Link>
      </h2>
      <div className="table-responsive">
        {siteList && siteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Site Id</th>
                <th>Street Address</th>
                <th>Postal Code</th>
                <th>City</th>
                <th>State Province</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Country</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {siteList.map((site, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${site.id}`} color="link" size="sm">
                      {site.id}
                    </Button>
                  </td>
                  <td>{site.siteId}</td>
                  <td>{site.streetAddress}</td>
                  <td>{site.postalCode}</td>
                  <td>{site.city}</td>
                  <td>{site.stateProvince}</td>
                  <td>{site.latitude}</td>
                  <td>{site.longitude}</td>
                  <td>{site.country ? <Link to={`country/${site.country.id}`}>{site.country.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${site.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${site.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${site.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Sites found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ site }: IRootState) => ({
  siteList: site.entities,
  loading: site.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Site);
