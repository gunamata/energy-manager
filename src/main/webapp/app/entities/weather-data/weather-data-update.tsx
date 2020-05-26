import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISite } from 'app/shared/model/site.model';
import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { getEntity, updateEntity, createEntity, reset } from './weather-data.reducer';
import { IWeatherData } from 'app/shared/model/weather-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWeatherDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WeatherDataUpdate = (props: IWeatherDataUpdateProps) => {
  const [siteId, setSiteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { weatherDataEntity, sites, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/weather-data');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSites();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...weatherDataEntity,
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
          <h2 id="energymanagerApp.weatherData.home.createOrEditLabel">Create or edit a WeatherData</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : weatherDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="weather-data-id">ID</Label>
                  <AvInput id="weather-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateLabel" for="weather-data-date">
                  Date
                </Label>
                <AvField id="weather-data-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="averageSurfaceTemparatureLabel" for="weather-data-averageSurfaceTemparature">
                  Average Surface Temparature
                </Label>
                <AvField
                  id="weather-data-averageSurfaceTemparature"
                  type="string"
                  className="form-control"
                  name="averageSurfaceTemparature"
                />
              </AvGroup>
              <AvGroup>
                <Label id="averageSurfaceDewPointLabel" for="weather-data-averageSurfaceDewPoint">
                  Average Surface Dew Point
                </Label>
                <AvField id="weather-data-averageSurfaceDewPoint" type="string" className="form-control" name="averageSurfaceDewPoint" />
              </AvGroup>
              <AvGroup>
                <Label id="averageSurfaceWetBulbTemperatureLabel" for="weather-data-averageSurfaceWetBulbTemperature">
                  Average Surface Wet Bulb Temperature
                </Label>
                <AvField
                  id="weather-data-averageSurfaceWetBulbTemperature"
                  type="string"
                  className="form-control"
                  name="averageSurfaceWetBulbTemperature"
                />
              </AvGroup>
              <AvGroup>
                <Label for="weather-data-site">Site</Label>
                <AvInput
                  id="weather-data-site"
                  type="select"
                  className="form-control"
                  name="site.id"
                  value={isNew ? sites[0] && sites[0].id : weatherDataEntity.site.id}
                  required
                >
                  {sites
                    ? sites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/weather-data" replace color="info">
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
  sites: storeState.site.entities,
  weatherDataEntity: storeState.weatherData.entity,
  loading: storeState.weatherData.loading,
  updating: storeState.weatherData.updating,
  updateSuccess: storeState.weatherData.updateSuccess
});

const mapDispatchToProps = {
  getSites,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDataUpdate);
