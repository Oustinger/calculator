import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../validators/checkers/argumentsNotFound';
import exprOnLeftMustNotBeNum from '../validators/checkers/exprOnLeftMustNotBeNum';
import numOnRightMustBe from '../validators/checkers/numOnRightMustBe';
import CalcOperationValidatorCreator from '../validators/CalcOperationValidatorCreator';

class SquareRoot extends CalcOperationClass {
    readonly canBePlacedAfterOtherOperation: boolean = true;
    readonly canBePlacedBeforeOtherOperation: boolean = true;

    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber * Math.pow(rightNumber, 0.5)];
    }
}

const validators = [
    new CalcOperationValidatorCreator(argumentsNotFound),
    new CalcOperationValidatorCreator(numOnRightMustBe),
    new CalcOperationValidatorCreator(exprOnLeftMustNotBeNum),
];

const squareRoot = new SquareRoot('square root', '√', 2, validators);

export default squareRoot;
