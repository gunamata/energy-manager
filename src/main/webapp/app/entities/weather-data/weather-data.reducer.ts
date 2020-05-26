import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWeatherData, defaultValue } from 'app/shared/model/weather-data.model';

export const ACTION_TYPES = {
  FETCH_WEATHERDATA_LIST: 'weatherData/FETCH_WEATHERDATA_LIST',
  FETCH_WEATHERDATA: 'weatherData/FETCH_WEATHERDATA',
  CREATE_WEATHERDATA: 'weatherData/CREATE_WEATHERDATA',
  UPDATE_WEATHERDATA: 'weatherData/UPDATE_WEATHERDATA',
  DELETE_WEATHERDATA: 'weatherData/DELETE_WEATHERDATA',
  RESET: 'weatherData/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWeatherData>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type WeatherDataState = Readonly<typeof initialState>;

// Reducer

export default (state: WeatherDataState = initialState, action): WeatherDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEATHERDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEATHERDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_WEATHERDATA):
    case REQUEST(ACTION_TYPES.UPDATE_WEATHERDATA):
    case REQUEST(ACTION_TYPES.DELETE_WEATHERDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_WEATHERDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WEATHERDATA):
    case FAILURE(ACTION_TYPES.CREATE_WEATHERDATA):
    case FAILURE(ACTION_TYPES.UPDATE_WEATHERDATA):
    case FAILURE(ACTION_TYPES.DELETE_WEATHERDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEATHERDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEATHERDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_WEATHERDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_WEATHERDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEATHERDATA):
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

const apiUrl = 'api/weather-data';

// Actions

export const getEntities: ICrudGetAllAction<IWeatherData> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WEATHERDATA_LIST,
  payload: axios.get<IWeatherData>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IWeatherData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEATHERDATA,
    payload: axios.get<IWeatherData>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IWeatherData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WEATHERDATA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWeatherData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEATHERDATA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWeatherData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEATHERDATA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
