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
        const formattedNumbers = numbers.map(symbol => formatOperation(symbol));
        const formattedDoubleZero = formatOperation(doubleZero);
        const formattedDecimalSeparator = formatOperation(decimalSeparator);

        const zeroNumber = formattedNumbers[0];
        const formattedNumbersWithOutZero = formattedNumbers.slice(1);

        const formattedNumbersRightOrdered = formattedNumbersWithOutZero.reverse()
            .reduce((acc, number, index) => {
                const accLastIndex = acc.length - 1;
                const lastChildArr = acc[accLastIndex];
                const accWithOutLastChildArr = acc.slice(0, accLastIndex);

                if ((index + 1) % 3 === 0) {
                    return [...accWithOutLastChildArr, [...lastChildArr, number].reverse(), []];
                }

                return [...accWithOutLastChildArr, [...lastChildArr, number]];
            }, [[]])
            .reduce((acc, childArr) => [...acc, ...childArr], []);

        return [
            ...formattedNumbersRightOrdered,
            formattedDoubleZero,
            zeroNumber,
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