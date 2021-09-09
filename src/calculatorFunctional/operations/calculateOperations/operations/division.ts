import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../validators/checkers/argumentsNotFound';
import divideByZero from '../validators/checkers/divideByZero';
import CalcOperationValidatorCreator from '../validators/CalcOperationValidatorCreator';
import stepByStepOperations from '../validators/checkers/stepByStepOperations';

class Division extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber / rightNumber];
    }
}

const validators = [
    new CalcOperationValidatorCreator(argumentsNotFound),
    new CalcOperationValidatorCreator(stepByStepOperations),
    new CalcOperationValidatorCreator(divideByZero),
];

const division = new Division('division', '/', 1, validators);

export default division;
