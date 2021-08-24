import isNumber from "../../../../utils/isNumber";
import Operation from "../calcOperationClass";

class Percent extends Operation {
    canBePlacedBeforeOtherOperation = true;
    hasOwnFullCalculateFunc = true;

    calculate(exprStructure, makeCalculations, operationIndex) {
        // checking operation before (on the left) this operation
        // there is should be only one operation with priority = 0 or no one at all
        if (!(1 <= operationIndex && operationIndex <= 3)) {
            // if false we need to calc part of expression on the left
            const exprLastIndexToCalc = operationIndex - 2;
            const newLeftPart = makeCalculations(exprStructure.slice(0, exprLastIndexToCalc), 0);

            const newExprStructure = [
                newLeftPart,
                ...exprStructure.slice(exprLastIndexToCalc),
            ];
            const newOperationIndex = 3;

            return this.calculate(newExprStructure, makeCalculations, newOperationIndex);
        }

        const mainNumIndex = operationIndex - 3;
        const isExistMainNum = (mainNumIndex >= 0) && isNumber(exprStructure[mainNumIndex]);
        const mainNum = isExistMainNum ? exprStructure[mainNumIndex] : 1;

        const secondaryNumIndex = operationIndex - 1;
        const secondaryNum = exprStructure[secondaryNumIndex];

        const result = mainNum / 100 * secondaryNum;

        const newExprStructure = [
            ...exprStructure.slice(0, secondaryNumIndex),
            result,
            ...exprStructure.slice(operationIndex + 1),
        ];

        return newExprStructure;
    };

    parseCheck(exprStructure, index) {
        super.parseCheck(exprStructure, index);

        const { isExistRightNum } = this.getRightNum(exprStructure, index);

        this.rightNumMustNotBe(isExistRightNum);
    }

    // custom parse checkers
    rightNumMustNotBe(isExistRightNum) {
        if (isExistRightNum) {
            throw new Error('The percent operation mustn\'t has a number on the right');
        }
    }
}

const percent = new Percent('%', 2);

export default percent;