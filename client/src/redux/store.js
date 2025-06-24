import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import winesReducer from "./winesRedux";
import { thunk } from "redux-thunk";
import orderReducer from "./orderRedux";

const subreducers = {
  wines: winesReducer,
  order: orderReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;