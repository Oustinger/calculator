import { createSelector } from "reselect";

export const getInput = (state) => state.calc.input;
export const getExpression = (state) => state.calc.expression;
export const getError = (state) => state.calc.error;


const formatOperation = (symbol, funcName = 'addSymbol', isInvert = false) => (
    { symbol, funcName, isInvert }
);

const getNumbersInputsPrimitive = (state) => state.calc.numbersInputs;
export const getNumbersInputs = createSelector(
    getNumbersInputsPrimitive,
    ({ numbers, doubleZero, decimalSeparator }) => {
        const formattedNumbers = numbers.map(symbol => formatOperation(symbol)).reverse();
        const formattedDoubleZero = formatOperation(doubleZero);
        const formattedDecimalSeparator = formatOperation(decimalSeparator);

        const formattedNumbersLastIndex = formattedNumbers.length - 1;
        return [
            ...formattedNumbers.slice(0, formattedNumbersLastIndex),
            formattedDoubleZero,
            formattedNumbers[formattedNumbersLastIndex],
            formattedDecimalSeparator,
        ];
    },
);

const getDefaultOperations = (state) => state.calc.defaultOperations;
const getCalcOperations = (state) => state.calc.calcOperations;

export const getTopLineOperations = createSelector(
    getDefaultOperations,
    getCalcOperations,
    ({ clean }, { squareRoot, percent }) => ([
        formatOperation(clean, 'clean'),
        formatOperation(squareRoot.symbol),
        formatOperation(percent.symbol),
    ]),
);

export const getRightColumnOperations = createSelector(
    getDefaultOperations,
    getCalcOperations,
    ({ calculate }, { division, multiplication, subtraction, addition }) => ([
        formatOperation(division.symbol),
        formatOperation(multiplication.symbol),
        formatOperation(subtraction.symbol),
        formatOperation(addition.symbol),
        formatOperation(calculate, 'calculate', true),
    ]),
);