import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../validators/checkers/argumentsNotFound';
import CalcOperationValidatorCreator from '../validators/CalcOperationValidatorCreator';
import stepByStepOperations from '../validators/checkers/stepByStepOperations';

class Multiplication extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber * rightNumber];
    }
}

const validators = [
    new CalcOperationValidatorCreator(argumentsNotFound),
    new CalcOperationValidatorCreator(stepByStepOperations),
];

const multiplication = new Multiplication('multiplication', '×', 1, validators, ['*']);

export default multiplication;
