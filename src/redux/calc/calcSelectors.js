import { createSelector } from "reselect";

export const getInput = (state) => state.calc.input;
export const getExpression = (state) => state.calc.expression;
export const getError = (state) => state.calc.error;
export const getNumbersInputs = (state) => state.calc.numbersInputs;
const getDefaultOperations = (state) => state.calc.defaultOperations;
const getCalcOperations = (state) => state.calc.calcOperations;

export const getTopLineOperations = createSelector(
    getDefaultOperations,
    getCalcOperations,
    ({ clean }, { squareRoot, percent }) => ([clean, squareRoot, percent]),
);

export const getRightColumnOperations = createSelector(
    getDefaultOperations,
    getCalcOperations,
    ({ calculate }, { division, multiplication, subtraction, addition }) => (
        [calculate, division, multiplication, subtraction, addition]
    ),
);