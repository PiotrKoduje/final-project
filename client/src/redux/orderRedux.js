import { API_URL } from "../config";

// SELECTORS
export const getOrder = state => state.order;
export const getOrderItems = state => state.order.items;
export const getCustomerData = state => state.order.customer;
export const getOrderRequests = state => state.order.requests.SEND_ORDER;

// ACTION NAME CREATOR
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

const ADD_ITEM = createActionName('ADD_ITEM');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
const SET_CUSTOMER_DATA = createActionName('SET_CUSTOMER_DATA');
const UPDATE_ITEM_QUANTITY = createActionName('UPDATE_ITEM_QUANTITY');
const UPDATE_INFO_FROM_CLIENT = createActionName('UPDATE_INFO_FROM_CLIENT');
const SEND_ORDER = createActionName('SEND_ORDER');
const CLEAR_ORDER = createActionName('CLEAR_ORDER');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// ACTIONS
export const addItem = payload => ({ type: ADD_ITEM, payload });
export const removeItem = payload => ({ type: REMOVE_ITEM, payload }); 
export const setCustomerData = payload => ({ type: SET_CUSTOMER_DATA, payload }); 
export const updateItemQuantity = (payload) => ({ type: UPDATE_ITEM_QUANTITY, payload });
export const updateInfoFromClient = (payload) => ({ type: UPDATE_INFO_FROM_CLIENT, payload });
export const sendOrder = payload => ({ type: SEND_ORDER, payload })
export const clearOrder = () => ({ type: CLEAR_ORDER });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });


// THUNKS 
export const sendOrderRequest = (payload) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'SEND_ORDER'}));
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }

    try {
      const res = await fetch(`${ API_URL }/api/orders`, options);
      if (res.ok) {
        dispatch(endRequest({ name: 'SEND_ORDER'}));
      }
      else if (res.status === 400) {
        dispatch(errorRequest({ name: 'SEND_ORDER', error: 'nieprawidłowe dane' }));
      } else if (res.status === 500) {
        dispatch(errorRequest({ name: 'SEND_ORDER', error: 'błąd servera' }));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'SEND_ORDER', error: e.message }));
    }
  };
};

// INITIAL STATE
const initialState = {
  customer: {
    name: '',
    address: '',
    phone: '',
    email: '',
  },
  items: [],
  requests: {
    SEND_ORDER: { error: null, pending: true, success: false }
  }
};

// REDUCER
const orderReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...statePart,
        items: [...statePart.items, action.payload],
      };

    case REMOVE_ITEM:
      return {
        ...statePart,
        items: statePart.items.filter(
          (item) => item.itemId !== action.payload
        ),
      };

    case UPDATE_ITEM_QUANTITY:
      return {
        ...statePart,
        items: statePart.items.map(item =>
          item.itemId === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity}
            : item
        )
      };

    case UPDATE_INFO_FROM_CLIENT:
      return {
        ...statePart,
        items: statePart.items.map(item =>
          item.itemId === action.payload.itemId
            ? { ...item, infoFromClient: action.payload.infoFromClient }
            : item
        )
      };

    case SET_CUSTOMER_DATA:
      return {
        ...statePart,
        customer: {
          ...action.payload,
        },
      };

    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: true,
            error: null,
            success: false,
          },
        },
      }; 

    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: null,
            success: true,
          },
        },
      };

    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.error,
            success: false,
          },
        },
      };

    case CLEAR_ORDER:
      return { ...initialState };
      
    default:
      return statePart;
  }
};

export default orderReducer;