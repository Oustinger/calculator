import numbersInputs from './numbersInputs';

const findNumberInputBySymbol = (symbol) => Object.values(numbersInputs)
    .find((numberInput) => numberInput.checkIsOperation(symbol));

export default findNumberInputBySymbol;