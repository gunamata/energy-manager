import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './energy-billing-data.reducer';
import { IEnergyBillingData } from 'app/shared/model/energy-billing-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnergyBillingDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnergyBillingDataDetail = (props: IEnergyBillingDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { energyBillingDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          EnergyBillingData [<b>{energyBillingDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            <TextFormat value={energyBillingDataEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="readDate">Read Date</span>
          </dt>
          <dd>
            <TextFormat value={energyBillingDataEntity.readDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="energyConsumption">Energy Consumption</span>
          </dt>
          <dd>{energyBillingDataEntity.energyConsumption}</dd>
          <dt>
            <span id="days">Days</span>
          </dt>
          <dd>{energyBillingDataEntity.days}</dd>
          <dt>Enrgytype</dt>
          <dd>{energyBillingDataEntity.enrgytype ? energyBillingDataEntity.enrgytype.id : ''}</dd>
          <dt>Site</dt>
          <dd>{energyBillingDataEntity.site ? energyBillingDataEntity.site.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/energy-billing-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/energy-billing-data/${energyBillingDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ energyBillingData }: IRootState) => ({
  energyBillingDataEntity: energyBillingData.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnergyBillingDataDetail);
