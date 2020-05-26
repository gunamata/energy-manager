import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { getEntity, updateEntity, createEntity, reset } from './site.reducer';
import { ISite } from 'app/shared/model/site.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SiteUpdate = (props: ISiteUpdateProps) => {
  const [countryId, setCountryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { siteEntity, countries, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/site');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCountries();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...siteEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="energymanagerApp.site.home.createOrEditLabel">Create or edit a Site</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : siteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="site-id">ID</Label>
                  <AvInput id="site-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="siteIdLabel" for="site-siteId">
                  Site Id
                </Label>
                <AvField id="site-siteId" type="string" className="form-control" name="siteId" />
              </AvGroup>
              <AvGroup>
                <Label id="streetAddressLabel" for="site-streetAddress">
                  Street Address
                </Label>
                <AvField id="site-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="site-postalCode">
                  Postal Code
                </Label>
                <AvField id="site-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="site-city">
                  City
                </Label>
                <AvField id="site-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="site-stateProvince">
                  State Province
                </Label>
                <AvField id="site-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="site-latitude">
                  Latitude
                </Label>
                <AvField id="site-latitude" type="string" className="form-control" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="site-longitude">
                  Longitude
                </Label>
                <AvField id="site-longitude" type="string" className="form-control" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label for="site-country">Country</Label>
                <AvInput id="site-country" type="select" className="form-control" name="country.id">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/site" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  countries: storeState.country.entities,
  siteEntity: storeState.site.entity,
  loading: storeState.site.loading,
  updating: storeState.site.updating,
  updateSuccess: storeState.site.updateSuccess
});

const mapDispatchToProps = {
  getCountries,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SiteUpdate);
