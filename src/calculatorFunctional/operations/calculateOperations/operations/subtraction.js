import Operation from "../calcOperationClass";

class Subtraction extends Operation {
    calculate(leftNum, rightNum) {
        return (leftNum !== null ? leftNum : 0) - (rightNum !== null ? rightNum : 0);
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const subtraction = new Subtraction('-', 0);

export default subtraction;