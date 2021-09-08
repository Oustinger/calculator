import { ICommonOperation } from '../commonOperationClass';
import numbersInputs from './numbersInputs';

const findNumberInputBySymbol = (symbol: string): ICommonOperation | undefined =>
    Object.values(numbersInputs).find((numberInput) => numberInput.checkIsOperation(symbol));

export default findNumberInputBySymbol;
