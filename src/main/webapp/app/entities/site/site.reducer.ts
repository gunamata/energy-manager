import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISite, defaultValue } from 'app/shared/model/site.model';

export const ACTION_TYPES = {
  FETCH_SITE_LIST: 'site/FETCH_SITE_LIST',
  FETCH_SITE: 'site/FETCH_SITE',
  CREATE_SITE: 'site/CREATE_SITE',
  UPDATE_SITE: 'site/UPDATE_SITE',
  DELETE_SITE: 'site/DELETE_SITE',
  RESET: 'site/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISite>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SiteState = Readonly<typeof initialState>;

// Reducer

export default (state: SiteState = initialState, action): SiteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SITE):
    case REQUEST(ACTION_TYPES.UPDATE_SITE):
    case REQUEST(ACTION_TYPES.DELETE_SITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SITE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SITE):
    case FAILURE(ACTION_TYPES.CREATE_SITE):
    case FAILURE(ACTION_TYPES.UPDATE_SITE):
    case FAILURE(ACTION_TYPES.DELETE_SITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SITE):
    case SUCCESS(ACTION_TYPES.UPDATE_SITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SITE):
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

const apiUrl = 'api/sites';

// Actions

export const getEntities: ICrudGetAllAction<ISite> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SITE_LIST,
    payload: axios.get<ISite>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SITE,
    payload: axios.get<ISite>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SITE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISite> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SITE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SITE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
