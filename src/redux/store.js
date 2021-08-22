import { createStore } from "redux";
import calcReducer from './calc/calcReducer';

const reducers = {
    calc: calcReducer,
};

const store = createStore(reducers);

export default store;