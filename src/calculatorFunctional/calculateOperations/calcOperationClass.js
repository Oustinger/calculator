import CommonOperationClass from '../commonOperationClass';
import isNumber from "../../utils/isNumber";

export default class Operation extends CommonOperationClass {
    constructor(symbol, priority, exSymbols = []) {
        super(symbol, exSymbols);
        this.priority = priority;
    }

    canBePlacedAfterOtherOperation = false;
    canBePlacedBeforeOtherOperation = false;

    hasOwnFullCalculateFunc = false;


    parseCheck(exprStructure, index) {
        this.argumentsNotFound(exprStructure, index);
    }

    getRightNum(exprStructure, index) {
        const rightNumIndex = index + 1;
        const isExistRightNum = (rightNumIndex < exprStructure.length) && isNumber(exprStructure[rightNumIndex]);
        const rightNum = isExistRightNum ? exprStructure[rightNumIndex] : null;
        return { rightNum, isExistRightNum };
    }

    getLeftNum(exprStructure, index) {
        const leftNumIndex = index - 1;
        const isExistLeftNum = (leftNumIndex >= 0) && isNumber(exprStructure[leftNumIndex]);
        const leftNum = isExistLeftNum ? exprStructure[leftNumIndex] : null;
        return { leftNum, isExistLeftNum };
    }

    getPrevExprElem(exprStructure, index) {
        const prevExprElemIndex = index - 1;

        const isExistPrevExprElem = prevExprElemIndex >= 0;

        const prevExprElem = isExistPrevExprElem ? exprStructure[prevExprElemIndex] : null;

        return { prevExprElem, isExistPrevExprElem };
    }

    getNextExprElem(exprStructure, index) {
        const nextExprElemIndex = index + 1;

        const isExistNextExprElem = nextExprElemIndex < exprStructure.length;

        const nextExprElem = isExistNextExprElem ? exprStructure[nextExprElemIndex] : null;

        return { nextExprElem, isExistNextExprElem };
    }

    // common parse checkers
    argumentsNotFound(exprStructure, index) {
        const { prevExprElem, isExistPrevExprElem } = this.getPrevExprElem(exprStructure, index);
        const { nextExprElem, isExistNextExprElem } = this.getNextExprElem(exprStructure, index);

        if (
            (!isExistPrevExprElem && !isExistNextExprElem) || (
                !(
                    isNumber(prevExprElem) ||
                    this.canBePlacedAfterOtherOperation ||
                    (nextExprElem && nextExprElem.canBePlacedBeforeOtherOperation)
                ) && !(
                    isNumber(nextExprElem) ||
                    this.canBePlacedBeforeOtherOperation ||
                    (nextExprElem && nextExprElem.canBePlacedAfterOtherOperation)
                )
            )
        ) {
            throw new Error('Arguments not found');
        }
    }
    stepByStepOperations(exprStructure, index) {
        const { prevExprElem } = this.getPrevExprElem(exprStructure, index);
        const { nextExprElem } = this.getNextExprElem(exprStructure, index);

        if (
            (
                prevExprElem && !isNumber(prevExprElem) && (
                    !prevExprElem.canBePlacedBeforeOtherOperation || this.canBePlacedAfterOtherOperation
                )
            ) || (
                nextExprElem && !isNumber(nextExprElem) && (
                    !nextExprElem.canBePlacedAfterOtherOperation || this.canBePlacedBeforeOtherOperation
                )
            )
        ) {
            throw new Error('There are operations that cannot be performed step by step');
        }
    }
};