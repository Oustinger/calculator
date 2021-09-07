import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import calcReducer from './calc/calcReducer';

const reducer = combineReducers({
    calc: calcReducer,
});

const store = configureStore({ reducer });

export default store;
