import isNumber from "../../../../utils/isNumber";
import { ExpressionType } from "../../../calculateResult/calculateResult";
import { ExprStructureType } from "../../../calculateResult/parseSymbols";
import CalcOperationClass from "../calcOperationClass";

class Division extends CalcOperationClass {
    calculate(params: { leftArg: number | null, rightArg: number | null }): ExpressionType {
        const leftNumber = params.leftArg !== null ? params.leftArg : 1;
        const rightNumber = params.rightArg !== null ? params.rightArg : 1;
        
        return [leftNumber / rightNumber];
    }

    parseCheck(exprStructure: ExprStructureType, index: number): void {
        super.parseCheck(exprStructure, index);

        const { rightNum } = this.getRightNum(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);

        if (isNumber(rightNum))
            this.divideByZero(rightNum);
    }

    // custom parse checkers
    divideByZero(rightNum: number): void {
        if (rightNum === 0) {
            throw new Error('You cannot divide by zero');
        }
    }
}

const division = new Division('division', '/', 1);

export default division;