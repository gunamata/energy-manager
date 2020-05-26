import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEnergyType } from 'app/shared/model/energy-type.model';
import { getEntities as getEnergyTypes } from 'app/entities/energy-type/energy-type.reducer';
import { ISite } from 'app/shared/model/site.model';
import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { getEntity, updateEntity, createEntity, reset } from './energy-billing-data.reducer';
import { IEnergyBillingData } from 'app/shared/model/energy-billing-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnergyBillingDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnergyBillingDataUpdate = (props: IEnergyBillingDataUpdateProps) => {
  const [enrgytypeId, setEnrgytypeId] = useState('0');
  const [siteId, setSiteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { energyBillingDataEntity, energyTypes, sites, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/energy-billing-data');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEnergyTypes();
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
        ...energyBillingDataEntity,
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
          <h2 id="energymanagerApp.energyBillingData.home.createOrEditLabel">Create or edit a EnergyBillingData</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : energyBillingDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="energy-billing-data-id">ID</Label>
                  <AvInput id="energy-billing-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startDateLabel" for="energy-billing-data-startDate">
                  Start Date
                </Label>
                <AvField id="energy-billing-data-startDate" type="date" className="form-control" name="startDate" />
              </AvGroup>
              <AvGroup>
                <Label id="readDateLabel" for="energy-billing-data-readDate">
                  Read Date
                </Label>
                <AvField id="energy-billing-data-readDate" type="date" className="form-control" name="readDate" />
              </AvGroup>
              <AvGroup>
                <Label id="energyConsumptionLabel" for="energy-billing-data-energyConsumption">
                  Energy Consumption
                </Label>
                <AvField id="energy-billing-data-energyConsumption" type="string" className="form-control" name="energyConsumption" />
              </AvGroup>
              <AvGroup>
                <Label id="daysLabel" for="energy-billing-data-days">
                  Days
                </Label>
                <AvField id="energy-billing-data-days" type="string" className="form-control" name="days" />
              </AvGroup>
              <AvGroup>
                <Label for="energy-billing-data-enrgytype">Enrgytype</Label>
                <AvInput
                  id="energy-billing-data-enrgytype"
                  type="select"
                  className="form-control"
                  name="enrgytype.id"
                  value={isNew ? energyTypes[0] && energyTypes[0].id : energyBillingDataEntity.enrgytype.id}
                  required
                >
                  {energyTypes
                    ? energyTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="energy-billing-data-site">Site</Label>
                <AvInput
                  id="energy-billing-data-site"
                  type="select"
                  className="form-control"
                  name="site.id"
                  value={isNew ? sites[0] && sites[0].id : energyBillingDataEntity.site.id}
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
              <Button tag={Link} id="cancel-save" to="/energy-billing-data" replace color="info">
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
  energyTypes: storeState.energyType.entities,
  sites: storeState.site.entities,
  energyBillingDataEntity: storeState.energyBillingData.entity,
  loading: storeState.energyBillingData.loading,
  updating: storeState.energyBillingData.updating,
  updateSuccess: storeState.energyBillingData.updateSuccess
});

const mapDispatchToProps = {
  getEnergyTypes,
  getSites,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnergyBillingDataUpdate);
