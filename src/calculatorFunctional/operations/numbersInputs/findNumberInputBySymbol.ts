import { CommonOperationInterface } from '../commonOperationClass';
import numbersInputs from './numbersInputs';

const findNumberInputBySymbol = (symbol: string): CommonOperationInterface | undefined => (
    Object.values(numbersInputs)
        .find((numberInput) => numberInput.checkIsOperation(symbol))
);

export default findNumberInputBySymbol;