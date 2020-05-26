import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './weather-data.reducer';
import { IWeatherData } from 'app/shared/model/weather-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWeatherDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WeatherDataDetail = (props: IWeatherDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { weatherDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          WeatherData [<b>{weatherDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>
            <TextFormat value={weatherDataEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="averageSurfaceTemparature">Average Surface Temparature</span>
          </dt>
          <dd>{weatherDataEntity.averageSurfaceTemparature}</dd>
          <dt>
            <span id="averageSurfaceDewPoint">Average Surface Dew Point</span>
          </dt>
          <dd>{weatherDataEntity.averageSurfaceDewPoint}</dd>
          <dt>
            <span id="averageSurfaceWetBulbTemperature">Average Surface Wet Bulb Temperature</span>
          </dt>
          <dd>{weatherDataEntity.averageSurfaceWetBulbTemperature}</dd>
          <dt>Site</dt>
          <dd>{weatherDataEntity.site ? weatherDataEntity.site.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/weather-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weather-data/${weatherDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ weatherData }: IRootState) => ({
  weatherDataEntity: weatherData.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDataDetail);
