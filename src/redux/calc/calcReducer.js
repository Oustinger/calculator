import parenthesesOperations from '../../calculatorFunctional/operations/parentheses/parentheses';
import calculateResult from './../../calculatorFunctional/calculateResult/calculateResult';
import calcOperations from './../../calculatorFunctional/operations/calculateOperations/calcOperations';
import defaultOperations from './../../calculatorFunctional/operations/defaultOperations/defaultOperations';
import numbersInputs from './../../calculatorFunctional/operations/numbersInputs/numbersInputs';

const SET_INPUT = 'calcReducer/SET_INPUT';
const ADD_SYMBOL = 'calcReducer/ADD_SYMBOL';
const CLEAN = 'calcReducer/CLEAN';
const CALCULATE = 'calcReducer/CALCULATE';
const DELETE_LAST_SYMBOL = 'calcReducer/DELETE_LAST_SYMBOL';

const initialState = {
    input: '',
    expression: null,
    numbersInputs,
    defaultOperations,
    parenthesesOperations,
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
        case DELETE_LAST_SYMBOL:
            return ({ ...state, input: state.input.slice(0, state.input.length - 1) });
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
export const deleteLastSymbol = () => ({ type: DELETE_LAST_SYMBOL });

export default calcReducer;