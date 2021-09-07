import { ExpressionType } from '../../../calculateResult/calculateResult';
import { ExprStructureType } from '../../../calculateResult/parseSymbols';
import CalcOperationClass from '../calcOperationClass';

class Addition extends CalcOperationClass {
    calculate(params: { leftArg: number | null; rightArg: number | null }): ExpressionType {
        const leftNumber = params.leftArg !== null ? params.leftArg : 0;
        const rightNumber = params.rightArg !== null ? params.rightArg : 0;

        return [leftNumber + rightNumber];
    }

    parseCheck(exprStructure: ExprStructureType, index: number): void {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const addition = new Addition('addition', '+', 0);

export default addition;
