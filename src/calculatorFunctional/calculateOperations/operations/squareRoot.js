import Operation from "../operation";

class SquareRoot extends Operation {
    canBePlacedAfterOtherOperation = true;
    canBePlacedBeforeOtherOperation = true;

    calculate(leftNum, rightNum) {
        return (leftNum ? leftNum : 1) * Math.pow(rightNum, 0.5);
    }

    checkArg(arg) {
        return arg >= 0;
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        const { isExistLeftNum } = this.getLeftNum(exprStructure, index);
        const { isExistRightNum } = this.getRightNum(exprStructure, index);

        this.rightNumMustBe(isExistRightNum);
        this.leftExprMustNotBeNum(isExistLeftNum);
    }

    // custom parse checkers
    rightNumMustBe(isExistRightNum) {
        if (!isExistRightNum) {
            throw new Error('The square root operation need an argument on the right');
        }
    }
    leftExprMustNotBeNum(isExistLeftNum) {
        if (isExistLeftNum) {
            throw new Error('The square root operation mustn\'t has any number on the right');
        }
    }
}

const squareRoot = new SquareRoot('√', 2);

export default squareRoot;