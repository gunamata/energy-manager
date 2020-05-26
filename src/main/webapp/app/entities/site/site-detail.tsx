import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './site.reducer';
import { ISite } from 'app/shared/model/site.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISiteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SiteDetail = (props: ISiteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { siteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Site [<b>{siteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="siteId">Site Id</span>
          </dt>
          <dd>{siteEntity.siteId}</dd>
          <dt>
            <span id="streetAddress">Street Address</span>
          </dt>
          <dd>{siteEntity.streetAddress}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{siteEntity.postalCode}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{siteEntity.city}</dd>
          <dt>
            <span id="stateProvince">State Province</span>
          </dt>
          <dd>{siteEntity.stateProvince}</dd>
          <dt>
            <span id="latitude">Latitude</span>
          </dt>
          <dd>{siteEntity.latitude}</dd>
          <dt>
            <span id="longitude">Longitude</span>
          </dt>
          <dd>{siteEntity.longitude}</dd>
          <dt>Country</dt>
          <dd>{siteEntity.country ? siteEntity.country.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/site" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/site/${siteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ site }: IRootState) => ({
  siteEntity: site.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SiteDetail);
