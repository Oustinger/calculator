import Operation from "../calcOperationClass";

class Multiplication extends Operation {
    calculate(leftNum, rightNum) {
        return (leftNum ? leftNum : 1) * (rightNum ? rightNum : 1)
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const multiplication = new Multiplication('×', 1, 56, ['*']);

export default multiplication;