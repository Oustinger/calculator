import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../validators/checkers/argumentsNotFound';
import CalcOperationValidatorCreator from '../validators/CalcOperationValidatorCreator';
import stepByStepOperations from '../validators/checkers/stepByStepOperations';

class Addition extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 0;
        const rightNumber = params.rightArg !== null ? params.rightArg : 0;

        return [leftNumber + rightNumber];
    }
}

const validators = [
    new CalcOperationValidatorCreator(argumentsNotFound),
    new CalcOperationValidatorCreator(stepByStepOperations),
];

const addition = new Addition('addition', '+', 0, validators);

export default addition;
