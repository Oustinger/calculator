import Operation from "../calcOperationClass";

class Division extends Operation {
    calculate(leftNum, rightNum) {
        return (leftNum !== null ? leftNum : 1) / (rightNum !== null ? rightNum : 1);
    }

    checkArg(arg) {
        return arg !== 0;
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        const { rightNum } = this.getRightNum(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
        this.divideByZero(rightNum);
    }

    // custom parse checkers
    divideByZero(rightNum) {
        if (rightNum === 0) {
            throw new Error('You cannot divide by zero');
        }
    }
}

const division = new Division('/', 1);

export default division;