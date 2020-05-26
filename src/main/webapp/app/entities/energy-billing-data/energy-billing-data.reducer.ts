import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEnergyBillingData, defaultValue } from 'app/shared/model/energy-billing-data.model';

export const ACTION_TYPES = {
  FETCH_ENERGYBILLINGDATA_LIST: 'energyBillingData/FETCH_ENERGYBILLINGDATA_LIST',
  FETCH_ENERGYBILLINGDATA: 'energyBillingData/FETCH_ENERGYBILLINGDATA',
  CREATE_ENERGYBILLINGDATA: 'energyBillingData/CREATE_ENERGYBILLINGDATA',
  UPDATE_ENERGYBILLINGDATA: 'energyBillingData/UPDATE_ENERGYBILLINGDATA',
  DELETE_ENERGYBILLINGDATA: 'energyBillingData/DELETE_ENERGYBILLINGDATA',
  RESET: 'energyBillingData/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEnergyBillingData>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EnergyBillingDataState = Readonly<typeof initialState>;

// Reducer

export default (state: EnergyBillingDataState = initialState, action): EnergyBillingDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENERGYBILLINGDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENERGYBILLINGDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ENERGYBILLINGDATA):
    case REQUEST(ACTION_TYPES.UPDATE_ENERGYBILLINGDATA):
    case REQUEST(ACTION_TYPES.DELETE_ENERGYBILLINGDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ENERGYBILLINGDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENERGYBILLINGDATA):
    case FAILURE(ACTION_TYPES.CREATE_ENERGYBILLINGDATA):
    case FAILURE(ACTION_TYPES.UPDATE_ENERGYBILLINGDATA):
    case FAILURE(ACTION_TYPES.DELETE_ENERGYBILLINGDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENERGYBILLINGDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENERGYBILLINGDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENERGYBILLINGDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_ENERGYBILLINGDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENERGYBILLINGDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/energy-billing-data';

// Actions

export const getEntities: ICrudGetAllAction<IEnergyBillingData> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ENERGYBILLINGDATA_LIST,
  payload: axios.get<IEnergyBillingData>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEnergyBillingData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENERGYBILLINGDATA,
    payload: axios.get<IEnergyBillingData>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEnergyBillingData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENERGYBILLINGDATA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEnergyBillingData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENERGYBILLINGDATA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEnergyBillingData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENERGYBILLINGDATA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
