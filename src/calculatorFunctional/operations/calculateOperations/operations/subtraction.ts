import { TExpression } from '../../../calculateResult/calculateResult';
import { TExprStructure } from '../../../calculateResult/parseSymbols';
import CalcOperationClass from '../calcOperationClass';

class Subtraction extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): TExpression {
        const leftNumber = params.leftArg !== null ? params.leftArg : 0;
        const rightNumber = params.rightArg !== null ? params.rightArg : 0;

        return [leftNumber - rightNumber];
    }

    parseCheck(exprStructure: TExprStructure, index: number): void {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const subtraction = new Subtraction('subtraction', '-', 0);

export default subtraction;
