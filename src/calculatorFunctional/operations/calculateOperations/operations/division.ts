import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../parseCheckers/checkers/argumentsNotFound';
import divideByZero from '../parseCheckers/checkers/divideByZero';
import ParseCheckerCreator from '../parseCheckers/ParseCheckerCreator';
import stepByStepOperations from '../parseCheckers/checkers/stepByStepOperations';

class Division extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber / rightNumber];
    }
}

const parseCheckers = [
    new ParseCheckerCreator(argumentsNotFound),
    new ParseCheckerCreator(stepByStepOperations),
    new ParseCheckerCreator(divideByZero),
];

const division = new Division('division', '/', 1, parseCheckers);

export default division;
