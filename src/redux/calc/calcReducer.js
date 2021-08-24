import calculateResult from '../../calculatorFunctional/calculateResult/calculateResult';
import calcOperations from './../../calculatorFunctional/calculateOperations/calcOperations';
import defaultOperations from './../../calculatorFunctional/defaultOperations/defaultOperations';
import numbersInputs from './../../calculatorFunctional/numbersInputs/numbersInputs';

const SET_INPUT = 'calcReducer/SET_INPUT';
const ADD_SYMBOL = 'calcReducer/ADD_SYMBOL';
const CLEAN = 'calcReducer/CLEAN';
const CALCULATE = 'calcReducer/CALCULATE';

const initialState = {
    input: '',
    expression: null,
    numbersInputs,
    defaultOperations,
    calcOperations,
    error: null,
}

const calcReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INPUT:
            return ({ ...state, ...action.payload });
        case ADD_SYMBOL:
            return ({ ...state, input: `${state.input}${action.symbol}` });
        case CLEAN:
            return ({ ...state, input: '', expression: null, error: null });
        case CALCULATE:
            try {
                const expression = state.input;
                const result = calculateResult(expression);
                return ({ ...state, input: result, expression, error: null });
            } catch (error) {
                return ({ ...state, error: error.message });
            }
        default:
            return state;
    }
};

export const setInput = (input) => ({ type: SET_INPUT, payload: { input } });
export const addSymbol = (symbol) => ({ type: ADD_SYMBOL, symbol });
export const calculate = () => ({ type: CALCULATE });
export const clean = () => ({ type: CLEAN });

export default calcReducer;