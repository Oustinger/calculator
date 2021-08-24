import { createSelector } from "reselect";

export const getInput = (state) => state.calc.input;
export const getExpression = (state) => state.calc.expression;
export const getError = (state) => state.calc.error;


const format = (symbol, keyCode, funcName = null, isInvert = false) => ({
    symbol,
    keyCode,
    funcName: funcName ? funcName : 'addSymbol',
    isInvert,
});
const formatOperations = (operations, customOperations = {}) => (
    Object.entries(operations)
        .reduce((acc, [name, operation]) => (
            {
                ...acc, [name]: format(
                    operation.getSymbol(),
                    operation.getKeyCode(),
                    customOperations[name] ? customOperations[name].funcName : null,
                    customOperations[name] ? customOperations[name].isInvert : null,
                )
            }
        ), {})
);

const getNumbersInputsPrimitive = (state) => state.calc.numbersInputs;
export const getNumbersInputs = createSelector(
    getNumbersInputsPrimitive,
    (numberInputs) => formatOperations(numberInputs),
);

const getDefaultOperationsPrimitive = (state) => state.calc.defaultOperations;
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

const getCalcOperationsPrimitive = (state) => state.calc.calcOperations;
export const getCalcOperations = createSelector(
    getCalcOperationsPrimitive,
    (operations) => formatOperations(operations),
);