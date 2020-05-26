import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEnergyType, defaultValue } from 'app/shared/model/energy-type.model';

export const ACTION_TYPES = {
  FETCH_ENERGYTYPE_LIST: 'energyType/FETCH_ENERGYTYPE_LIST',
  FETCH_ENERGYTYPE: 'energyType/FETCH_ENERGYTYPE',
  CREATE_ENERGYTYPE: 'energyType/CREATE_ENERGYTYPE',
  UPDATE_ENERGYTYPE: 'energyType/UPDATE_ENERGYTYPE',
  DELETE_ENERGYTYPE: 'energyType/DELETE_ENERGYTYPE',
  RESET: 'energyType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEnergyType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EnergyTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: EnergyTypeState = initialState, action): EnergyTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENERGYTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENERGYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ENERGYTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_ENERGYTYPE):
    case REQUEST(ACTION_TYPES.DELETE_ENERGYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ENERGYTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENERGYTYPE):
    case FAILURE(ACTION_TYPES.CREATE_ENERGYTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_ENERGYTYPE):
    case FAILURE(ACTION_TYPES.DELETE_ENERGYTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENERGYTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENERGYTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENERGYTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_ENERGYTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENERGYTYPE):
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

const apiUrl = 'api/energy-types';

// Actions

export const getEntities: ICrudGetAllAction<IEnergyType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ENERGYTYPE_LIST,
  payload: axios.get<IEnergyType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEnergyType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENERGYTYPE,
    payload: axios.get<IEnergyType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEnergyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENERGYTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEnergyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENERGYTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEnergyType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENERGYTYPE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
