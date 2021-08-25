import Operation from "../calcOperationClass";

class Multiplication extends Operation {
    calculate(leftNum, rightNum) {
        return (leftNum !== null ? leftNum : 1) * (rightNum !== null ? rightNum : 1)
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const multiplication = new Multiplication('multiplication', '×', 1, ['*']);

export default multiplication;