import { combineReducers, compose, createStore } from "redux";
import calcReducer from './calc/calcReducer';

const reducers = combineReducers({
    calc: calcReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());

export default store;