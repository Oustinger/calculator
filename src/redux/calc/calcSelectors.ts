import { RootStateOrAny } from 'react-redux';
import { createSelector } from 'reselect';
import { ICalcOperations } from '../../calculatorFunctional/operations/calculateOperations/calcOperations';
import { ICommonOperation } from '../../calculatorFunctional/operations/commonOperationClass';
import { IDefaultOperations } from '../../calculatorFunctional/operations/defaultOperations/defaultOperations';
import { INumbersInputs } from '../../calculatorFunctional/operations/numbersInputs/numbersInputs';
import { IParentheses } from '../../calculatorFunctional/operations/parentheses/parentheses';

export const getInput = (state: RootStateOrAny): string => state.calc.input;
export const getExpression = (state: RootStateOrAny): string => state.calc.expression;
export const getError = (state: RootStateOrAny): string => state.calc.error;

export type TFormatOperation = {
    symbol: string;
    exSymbols: string[];
    funcName: string;
    isInvert: boolean;
};

export interface IFormatOperations {
    [operationName: string]: TFormatOperation;
}

const formatOperations = (
    operations: {
        [operationName: string]: ICommonOperation;
    },
    customOperations: {
        [operationName: string]: {
            funcName: string;
            isInvert?: boolean;
        };
    } = {}
): IFormatOperations =>
    Object.entries(operations).reduce(
        (acc, [name, operation]) => ({
            ...acc,
            [name]: {
                symbol: operation.getSymbol(),
                exSymbols: operation.getExSymbols(),
                funcName: customOperations[name] ? customOperations[name].funcName : 'addSymbol',
                isInvert: customOperations[name] ? customOperations[name].isInvert : false,
            },
        }),
        {}
    );

const getNumbersInputsPrimitive = (state: RootStateOrAny): INumbersInputs => state.calc.numbersInputs;
export const getNumbersInputs = createSelector(getNumbersInputsPrimitive, (numberInputs: INumbersInputs) =>
    formatOperations(numberInputs)
);

const getParenthesesOperationsPrimitive = (state: RootStateOrAny): IParentheses => state.calc.parenthesesOperations;
export const getParenthesesOperations = createSelector(getParenthesesOperationsPrimitive, (parenthesesOperations) =>
    formatOperations(parenthesesOperations)
);

const getDefaultOperationsPrimitive = (state: RootStateOrAny): IDefaultOperations => state.calc.defaultOperations;
export const getDefaultOperations = createSelector(getDefaultOperationsPrimitive, (operations) =>
    formatOperations(operations, {
        clean: {
            funcName: 'clean',
        },
        calculate: {
            funcName: 'calculate',
            isInvert: true,
        },
    })
);

const getCalcOperationsPrimitive = (state: RootStateOrAny): ICalcOperations => state.calc.calcOperations;
export const getCalcOperations = createSelector(getCalcOperationsPrimitive, (operations) =>
    formatOperations(operations)
);
