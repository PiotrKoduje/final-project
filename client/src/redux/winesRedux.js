import { API_URL } from "../config";

// SELECTORS
export const getWines = state => state.wines.list;
export const getWine = (state, id) => state.wines.visitedList.find(wine => wine.id === id);
export const getCountryWines = state => state.wines.countryList;
export const getWinesRequests = state => state.wines.requests.LOAD_WINES;
export const getWineRequests = state => state.wines.requests.LOAD_WINE;
export const getCountryWineRequests = state => state.wines.requests.LOAD_COUNTRY_WINES;

// ACTION NAME CREATOR
const reducerName = 'wines';
const createActionName = name => `app/${ reducerName }/${ name }`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_WINES = createActionName('LOAD_WINES');
const LOAD_WINE = createActionName('LOAD_WINE');
const LOAD_COUNTRY_WINES = createActionName('LOAD_COUNTRY_WINES');

// ACTIONS
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadWines = payload => ({ payload, type: LOAD_WINES });
export const loadWine = payload => ({ payload, type: LOAD_WINE });
export const loadCountryWines = payload => ({ payload, type: LOAD_COUNTRY_WINES });

// THUNKS 
export const loadWinesRequest = () => {
  return async dispatch => {
    dispatch(startRequest({ name: 'LOAD_WINES'}));
    try {
      const res = await fetch(`${API_URL}/api/wines`);
      if (res.status === 200) {
        const wines = await res.json();
        dispatch(loadWines(wines));
        dispatch(endRequest({ name: 'LOAD_WINES'}));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_WINES', error: e.message }));
    }
  };
};

export const loadCountryWinesRequest = (country) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'LOAD_COUNTRY_WINES'}));
    try {
      const res = await fetch(`${ API_URL }/api/wines/country/${ country }`);
      if (res.status === 200) {
        const wines = await res.json();
        dispatch(loadCountryWines(wines));
        dispatch(endRequest({ name: 'LOAD_COUNTRY_WINES'}));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_COUNTRY_WINES', error: e.message }));
    }
  };
};

export const loadWineRequest = (id) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'LOAD_WINE'}));
    try {
      const res = await fetch(`${ API_URL }/api/wines/${ id }`);
      if (res.status === 200) {
        const wine = await res.json();
        dispatch(loadWine(wine));
        dispatch(endRequest({ name: 'LOAD_WINE'}));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_WINE', error: e.message }));
    }
  };
};

// INITIAL STATE 
const initialState = {
  list: [],
  countryList: [],
  visitedList: [],
  requests: {
    LOAD_WINES: { error: null, pending: true, success: false },
    LOAD_WINE: { error: null, pending: true, success: false }
  },
};

// REDUCER
const winesReducer = (statePart = initialState, action) => {
  switch (action.type){
    case LOAD_WINES: 
      return { ...statePart, list: [...action.payload] };
    case LOAD_WINE: 
      return { ...statePart, visitedList: [ ...statePart.visitedList, action.payload] };
    case LOAD_COUNTRY_WINES: 
      return { ...statePart, countryList: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  }
}

export default winesReducer;