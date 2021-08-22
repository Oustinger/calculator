import Operation from "../operation";

class Addition extends Operation {
    calculate(leftNum, rightNum) {
        return (leftNum ? leftNum : 0) + (rightNum ? rightNum : 0);
    }

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        this.stepByStepOperations(exprStructure, index);
    }
}

const addition = new Addition('+', 0);

export default addition;