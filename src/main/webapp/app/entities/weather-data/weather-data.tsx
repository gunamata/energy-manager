import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './weather-data.reducer';
import { IWeatherData } from 'app/shared/model/weather-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWeatherDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const WeatherData = (props: IWeatherDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { weatherDataList, match, loading } = props;
  return (
    <div>
      <h2 id="weather-data-heading">
        Weather Data
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Weather Data
        </Link>
      </h2>
      <div className="table-responsive">
        {weatherDataList && weatherDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Average Surface Temparature</th>
                <th>Average Surface Dew Point</th>
                <th>Average Surface Wet Bulb Temperature</th>
                <th>Site</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {weatherDataList.map((weatherData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${weatherData.id}`} color="link" size="sm">
                      {weatherData.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={weatherData.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{weatherData.averageSurfaceTemparature}</td>
                  <td>{weatherData.averageSurfaceDewPoint}</td>
                  <td>{weatherData.averageSurfaceWetBulbTemperature}</td>
                  <td>{weatherData.site ? <Link to={`site/${weatherData.site.id}`}>{weatherData.site.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${weatherData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${weatherData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${weatherData.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Weather Data found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ weatherData }: IRootState) => ({
  weatherDataList: weatherData.entities,
  loading: weatherData.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WeatherData);
