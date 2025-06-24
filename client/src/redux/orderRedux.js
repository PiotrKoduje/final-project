// SELECTORS
export const getOrder = state => state.order;
export const getOrderItems = state => state.order.items;
export const getCustomerData = state => state.order.customer;

// ACTION NAME CREATOR
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

const ADD_ITEM = createActionName('ADD_ITEM');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
const SET_CUSTOMER_DATA = createActionName('SET_CUSTOMER_DATA');
const UPDATE_ITEM_QUANTITY = createActionName('UPDATE_ITEM_QUANTITY');
const UPDATE_INFO_FROM_CLIENT = createActionName('UPDATE_INFO_FROM_CLIENT');
const CLEAR_ORDER = createActionName('CLEAR_ORDER');

// ACTIONS
export const addItem = payload => ({ type: ADD_ITEM, payload });
export const removeItem = payload => ({ type: REMOVE_ITEM, payload }); 
export const setCustomerData = payload => ({ type: SET_CUSTOMER_DATA, payload }); // 
export const updateItemQuantity = (payload) => ({ type: UPDATE_ITEM_QUANTITY, payload });
export const updateInfoFromClient = (payload) => ({ type: UPDATE_INFO_FROM_CLIENT, payload });
export const clearOrder = () => ({ type: CLEAR_ORDER });


// INITIAL STATE
const initialState = {
  customer: {
    name: '',
    address: '',
    phone: '',
    email: '',
  },
  items: [],
};

// REDUCER
const orderReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...statePart, items: [...statePart.items, action.payload]};
    case REMOVE_ITEM:
      return { ...statePart, items: statePart.items.filter(item => item.itemId !== action.payload)};


    case UPDATE_ITEM_QUANTITY:
      return {
        ...statePart,
        items: statePart.items.map(item =>
          item.itemId === action.payload.itemId
            ? { ...item, quantity: Math.max(1, Math.min(10, Number(action.payload.quantity) || 1)) }
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
      return {  ...statePart, customer: { ...action.payload },
      };
    case CLEAR_ORDER:
      return initialState;
    default:
      return statePart;
  }
};

export default orderReducer;