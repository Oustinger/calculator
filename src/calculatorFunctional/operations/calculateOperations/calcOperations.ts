import { ICalcOperationClass } from './calcOperationClass';
import addition from './operations/addition';
import division from './operations/division';
import multiplication from './operations/multiplication';
import percent from './operations/percent';
import squareRoot from './operations/squareRoot';
import subtraction from './operations/subtraction';

export interface ICalcOperations {
    [calcOperationName: string]: ICalcOperationClass;
}

const calcOperations = {
    addition,
    division,
    multiplication,
    percent,
    squareRoot,
    subtraction,
};

export default calcOperations;
