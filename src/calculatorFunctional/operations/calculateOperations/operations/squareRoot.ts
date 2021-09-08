import { TExpression } from '../../../calculateResult/calculateResult';
import { TExprStructure } from '../../../calculateResult/parseSymbols';
import CalcOperationClass from '../calcOperationClass';

class SquareRoot extends CalcOperationClass {
    readonly canBePlacedAfterOtherOperation: boolean = true;
    readonly canBePlacedBeforeOtherOperation: boolean = true;

    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber * Math.pow(rightNumber, 0.5)];
    }

    parseCheck(exprStructure: TExprStructure, index: number): void {
        super.parseCheck(exprStructure, index);

        const { isExistLeftNum } = this.getLeftNum(exprStructure, index);
        const { isExistRightNum } = this.getRightNum(exprStructure, index);

        this.numOnRightMustBe(isExistRightNum);
        this.exprOnLeftMustNotBeNum(isExistLeftNum);
    }
}

const squareRoot = new SquareRoot('square root', '√', 2);

export default squareRoot;
