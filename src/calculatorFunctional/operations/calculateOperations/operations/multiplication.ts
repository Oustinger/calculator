import { TExpression } from '../../../calculateResult/calculateResult';
import { TExprStructure } from '../../../calculateResult/parseSymbols';
import CalcOperationClass from '../calcOperationClass';

class Multiplication extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;

        return [leftNumber * rightNumber];
    }

    parseCheck(exprStructure: TExprStructure, index: number): void {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const multiplication = new Multiplication('multiplication', '×', 1, ['*']);

export default multiplication;
