import CommonOperationClass from '../commonOperationClass';
import isNumber from "../../../utils/isNumber";

export default class Operation extends CommonOperationClass {
    constructor(operationName, symbol, priority, exSymbols = []) {
        super(symbol, exSymbols);
        this.operationName = operationName;
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
            !(
                (isExistPrevExprElem || isExistNextExprElem) && (
                    (
                        isNumber(prevExprElem) ||
                        this.canBePlacedAfterOtherOperation ||
                        (isExistNextExprElem && nextExprElem.canBePlacedBeforeOtherOperation)
                    ) || (
                        isNumber(nextExprElem) ||
                        this.canBePlacedBeforeOtherOperation ||
                        (isExistNextExprElem && nextExprElem.canBePlacedAfterOtherOperation)
                    )
                )
            )
        ) {
            throw new Error(`Arguments for ${this.operationName} not found`);
        }
    }
    stepByStepOperations(exprStructure, index) {
        const { prevExprElem, isExistPrevExprElem } = this.getPrevExprElem(exprStructure, index);
        const { nextExprElem, isExistNextExprElem } = this.getNextExprElem(exprStructure, index);

        if (
            (
                isExistPrevExprElem
                && !isNumber(prevExprElem)
                && !Array.isArray(prevExprElem)
                && !prevExprElem.canBePlacedBeforeOtherOperation
                && !this.canBePlacedAfterOtherOperation
            ) || (
                isExistNextExprElem
                && !isNumber(nextExprElem)
                && !Array.isArray(nextExprElem)
                && !nextExprElem.canBePlacedAfterOtherOperation
                && !this.canBePlacedBeforeOtherOperation
            )
        ) {
            throw new Error(`The ${this.operationName} cannot be performed before other operation`);
        }
    }
    numOnRightMustBe(isExistRightNum) {
        if (!isExistRightNum)
            throw new Error(`The ${this.operationName} operation need an argument on the right`);
    }
    numOnRightMustNotBe(isExistRightNum) {
        if (isExistRightNum)
            throw new Error(`The ${this.operationName} operation mustn't has a number on the right`);
    }
    exprOnLeftMustNotBeNum(isExistLeftNum) {
        if (isExistLeftNum)
            throw new Error(`The ${this.operationName} operation mustn't has any number on the left`);
    }
};