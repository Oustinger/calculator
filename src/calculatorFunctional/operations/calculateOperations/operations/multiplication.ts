import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../parseCheckers/checkers/argumentsNotFound';
import ParseCheckerCreator from '../parseCheckers/ParseCheckerCreator';
import stepByStepOperations from '../parseCheckers/checkers/stepByStepOperations';

class Multiplication extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber * rightNumber];
    }
}

const parseCheckers = [new ParseCheckerCreator(argumentsNotFound), new ParseCheckerCreator(stepByStepOperations)];

const multiplication = new Multiplication('multiplication', '×', 1, parseCheckers, ['*']);

export default multiplication;
