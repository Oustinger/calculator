import { combineReducers, createStore } from "redux";
import calcReducer from './calc/calcReducer';

const reducers = combineReducers({
    calc: calcReducer,
});

const store = createStore(reducers);

export default store;