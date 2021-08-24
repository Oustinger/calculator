import { createSelector } from "reselect";

export const getInput = (state) => state.calc.input;
export const getExpression = (state) => state.calc.expression;
export const getError = (state) => state.calc.error;


const formatOperation = (symbol, keyCode, funcName = 'addSymbol', isInvert = false) => (
    { symbol, keyCode, funcName, isInvert }
);

const getNumbersInputsPrimitive = (state) => state.calc.numbersInputs;
export const getNumbersInputs = createSelector(
    getNumbersInputsPrimitive,
    ({ zero, one, two, three, four, five, six, seven, eight, nine, doubleZero, comma }) => ([
        formatOperation(seven.getSymbol(), seven.getKeyCode()),
        formatOperation(eight.getSymbol(), eight.getKeyCode()),
        formatOperation(nine.getSymbol(), nine.getKeyCode()),
        formatOperation(six.getSymbol(), six.getKeyCode()),
        formatOperation(four.getSymbol(),four.getKeyCode()),
        formatOperation(five.getSymbol(), five.getKeyCode()),
        formatOperation(three.getSymbol(), three.getKeyCode()),
        formatOperation(two.getSymbol(), two.getKeyCode()),
        formatOperation(one.getSymbol(), one.getKeyCode()),
        formatOperation(doubleZero.getSymbol(), doubleZero.getKeyCode()),
        formatOperation(zero.getSymbol(), zero.getKeyCode()),
        formatOperation(comma.getSymbol(), comma.getKeyCode()),
    ]),
);

const getDefaultOperations = (state) => state.calc.defaultOperations;
const getCalcOperations = (state) => state.calc.calcOperations;

export const getTopLineOperations = createSelector(
    getDefaultOperations,
    getCalcOperations,
    ({ clean }, { squareRoot, percent }) => ([
        formatOperation(clean.getSymbol(), clean.getKeyCode(), 'clean'),
        formatOperation(squareRoot.getSymbol(), squareRoot.getKeyCode()),
        formatOperation(percent.getSymbol(), percent.getKeyCode()),
    ]),
);

export const getRightColumnOperations = createSelector(
    getDefaultOperations,
    getCalcOperations,
    ({ calculate }, { division, multiplication, subtraction, addition }) => ([
        formatOperation(division.getSymbol(), division.getKeyCode()),
        formatOperation(multiplication.getSymbol(), multiplication.getKeyCode()),
        formatOperation(subtraction.getSymbol(), subtraction.getKeyCode()),
        formatOperation(addition.getSymbol(), addition.getKeyCode()),
        formatOperation(calculate.getSymbol(), calculate.getKeyCode(), 'calculate', true),
    ]),
);