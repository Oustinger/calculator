import { TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../parseCheckers/checkers/argumentsNotFound';
import exprOnLeftMustNotBeNum from '../parseCheckers/checkers/exprOnLeftMustNotBeNum';
import numOnRightMustBe from '../parseCheckers/checkers/numOnRightMustBe';
import ParseCheckerCreator from '../parseCheckers/ParseCheckerCreator';

class SquareRoot extends CalcOperationClass {
    readonly canBePlacedAfterOtherOperation: boolean = true;
    readonly canBePlacedBeforeOtherOperation: boolean = true;

    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber * Math.pow(rightNumber, 0.5)];
    }
}

const parseCheckers = [
    new ParseCheckerCreator(argumentsNotFound),
    new ParseCheckerCreator(numOnRightMustBe),
    new ParseCheckerCreator(exprOnLeftMustNotBeNum),
];

const squareRoot = new SquareRoot('square root', '√', 2, parseCheckers);

export default squareRoot;
