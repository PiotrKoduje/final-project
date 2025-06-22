import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import winesReducer from "./winesRedux";
import { thunk } from "redux-thunk";

const subreducers = {
  wines: winesReducer
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