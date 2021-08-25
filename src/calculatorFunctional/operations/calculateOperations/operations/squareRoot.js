import Operation from "../calcOperationClass";

class SquareRoot extends Operation {
    canBePlacedAfterOtherOperation = true;
    canBePlacedBeforeOtherOperation = true;

    calculate(leftNum, rightNum) {
        return (leftNum !== null ? leftNum : 1) * Math.pow(rightNum, 0.5);
    }

    checkArg(arg) {
        return arg >= 0;
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        const { isExistLeftNum } = this.getLeftNum(exprStructure, index);
        const { isExistRightNum } = this.getRightNum(exprStructure, index);

        this.numOnRightMustBe(isExistRightNum);
        this.exprOnLeftMustNotBeNum(isExistLeftNum);
    }
}

const squareRoot = new SquareRoot('square root', '√', 2);

export default squareRoot;