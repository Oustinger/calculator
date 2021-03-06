import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calculateResult from '../../calculatorFunctional/calculateResult/calculateResult';
import calcOperations, {
    ICalcOperations,
} from '../../calculatorFunctional/operations/calculateOperations/calcOperations';
import defaultOperations, {
    IDefaultOperations,
} from '../../calculatorFunctional/operations/defaultOperations/defaultOperations';
import numbersInputs, { INumbersInputs } from '../../calculatorFunctional/operations/numbersInputs/numbersInputs';
import parenthesesOperations, { IParentheses } from '../../calculatorFunctional/operations/parentheses/parentheses';

interface ICalcReducerState {
    input: string;
    expression: string | null;
    numbersInputs: INumbersInputs;
    defaultOperations: IDefaultOperations;
    parenthesesOperations: IParentheses;
    calcOperations: ICalcOperations;
    error: string | null;
}

const initialState: ICalcReducerState = {
    input: '',
    expression: null,
    numbersInputs,
    defaultOperations,
    parenthesesOperations,
    calcOperations,
    error: null,
};

export type TCalcReducerPayloadAction = PayloadAction<{ [paramName: string]: string } | undefined>;

export const calcSlice = createSlice({
    name: 'calc',
    initialState,
    reducers: {
        setInputAction: (state, action: TCalcReducerPayloadAction) => ({ ...state, ...action.payload }),
        addSymbolAction: (state, action: TCalcReducerPayloadAction) => ({
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

export const setInput = (input: string): TCalcReducerPayloadAction => setInputAction({ input });
export const addSymbol = (symbol: string): TCalcReducerPayloadAction => addSymbolAction({ symbol });
export const calculate = (): TCalcReducerPayloadAction => calculateAction();
export const clean = (): TCalcReducerPayloadAction => cleanAction();
export const deleteLastSymbol = (): TCalcReducerPayloadAction => deleteLastSymbolAction();

export default calcSlice.reducer;
