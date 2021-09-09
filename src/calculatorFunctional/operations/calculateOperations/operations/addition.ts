import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../parseCheckers/checkers/argumentsNotFound';
import ParseCheckerCreator from '../parseCheckers/ParseCheckerCreator';
import stepByStepOperations from '../parseCheckers/checkers/stepByStepOperations';

class Addition extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 0;
        const rightNumber = params.rightArg !== null ? params.rightArg : 0;

        return [leftNumber + rightNumber];
    }
}

const parseCheckers = [new ParseCheckerCreator(argumentsNotFound), new ParseCheckerCreator(stepByStepOperations)];

const addition = new Addition('addition', '+', 0, parseCheckers);

export default addition;
