import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calculateResult from '../../calculatorFunctional/calculateResult/calculateResult';
import calcOperations, {
    CalcOperationsInterface,
} from '../../calculatorFunctional/operations/calculateOperations/calcOperations';
import defaultOperations, {
    DefaultOperationsInterface,
} from '../../calculatorFunctional/operations/defaultOperations/defaultOperations';
import numbersInputs, {
    NumbersInputsInterface,
} from '../../calculatorFunctional/operations/numbersInputs/numbersInputs';
import parenthesesOperations, {
    ParenthesesInterface,
} from '../../calculatorFunctional/operations/parentheses/parentheses';

interface calcReducerStateInterface {
    input: string;
    expression: string | null;
    numbersInputs: NumbersInputsInterface;
    defaultOperations: DefaultOperationsInterface;
    parenthesesOperations: ParenthesesInterface;
    calcOperations: CalcOperationsInterface;
    error: string | null;
}

const initialState: calcReducerStateInterface = {
    input: '',
    expression: null,
    numbersInputs,
    defaultOperations,
    parenthesesOperations,
    calcOperations,
    error: null,
};

type MyPayloadAction = PayloadAction<{ [key: string]: string }>;

export const calcSlice = createSlice({
    name: 'calc',
    initialState,
    reducers: {
        setInputAction: (state, action: MyPayloadAction) => ({ ...state, ...action.payload }),
        addSymbolAction: (state, action: MyPayloadAction) => ({
            ...state,
            input: `${state.input}${action.payload ? action.payload.symbol : ''}`,
        }),
        calculateAction: (state) => {
            try {
                const expression = state.input;
                const result = calculateResult(expression);
                return { ...state, input: result, expression, error: null };
            } catch (error) {
                return { ...state, error: error.message };
            }
        },
        cleanAction: (state) => ({ ...state, input: '', expression: null, error: null }),
        deleteLastSymbolAction: (state) => ({ ...state, input: state.input.slice(0, state.input.length - 1) }),
    },
});

const { setInputAction, addSymbolAction, calculateAction, cleanAction, deleteLastSymbolAction } = calcSlice.actions;

export const setInput = (input: string) => setInputAction({ input });
export const addSymbol = (symbol: string) => addSymbolAction({ symbol });
export const calculate = () => calculateAction();
export const clean = () => cleanAction();
export const deleteLastSymbol = () => deleteLastSymbolAction();

export default calcSlice.reducer;
