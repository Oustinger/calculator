import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";
import { CalcOperationsInterface } from "../../calculatorFunctional/operations/calculateOperations/calcOperations";
import { CommonOperationInterface } from "../../calculatorFunctional/operations/commonOperationClass";
import { DefaultOperationsInterface } from "../../calculatorFunctional/operations/defaultOperations/defaultOperations";
import { NumbersInputsInterface } from "../../calculatorFunctional/operations/numbersInputs/numbersInputs";
import { ParenthesesInterface } from "../../calculatorFunctional/operations/parentheses/parentheses";

export const getInput = (state: RootStateOrAny): string => state.calc.input;
export const getExpression = (state: RootStateOrAny): string => state.calc.expression;
export const getError = (state: RootStateOrAny): string => state.calc.error;


const formatOperations = (
    operations: {
        [operationName: string]: CommonOperationInterface,
    },
    customOperations: {
        [operationName: string]: {
            funcName: string,
            isInvert?: boolean,
        },
    } = {},
): {
    [operationName: string]: {
        symbol: string,
        exSymbols: Array<string>,
        funcName: string,
        isInvert: boolean,
    }
} => (
    Object.entries(operations)
        .reduce((acc, [name, operation]) => (
            {
                ...acc, [name]: {
                    symbol: operation.getSymbol(),
                    exSymbols: operation.getExSymbols(),
                    funcName: customOperations[name] ? customOperations[name].funcName : 'addSymbol',
                    isInvert: customOperations[name] ? customOperations[name].isInvert : false,
                }
            }
        ), {})
);

const getNumbersInputsPrimitive = (state: RootStateOrAny): NumbersInputsInterface => state.calc.numbersInputs;
export const getNumbersInputs = createSelector(
    getNumbersInputsPrimitive,
    (numberInputs: NumbersInputsInterface) => formatOperations(numberInputs),
);

const getParenthesesOperationsPrimitive = (state: RootStateOrAny): ParenthesesInterface => (
    state.calc.parenthesesOperations
);
export const getParenthesesOperations = createSelector(
    getParenthesesOperationsPrimitive,
    (parenthesesOperations) => formatOperations(parenthesesOperations),
);

const getDefaultOperationsPrimitive = (state: RootStateOrAny): DefaultOperationsInterface => (
    state.calc.defaultOperations
);
export const getDefaultOperations = createSelector(
    getDefaultOperationsPrimitive,
    (operations) => formatOperations(operations, {
        clean: {
            funcName: 'clean',
        },
        calculate: {
            funcName: 'calculate',
            isInvert: true,
        },
    }),
);

const getCalcOperationsPrimitive = (state: RootStateOrAny): CalcOperationsInterface => state.calc.calcOperations;
export const getCalcOperations = createSelector(
    getCalcOperationsPrimitive,
    (operations) => formatOperations(operations),
);