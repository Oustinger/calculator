import isNumber from '../../../utils/isNumber';
import { ExpressionType } from '../../calculateResult/calculateResult';
import { ExprStructureType } from '../../calculateResult/parseSymbols';
import CommonOperationClass, { ICommonOperation } from '../commonOperationClass';

export interface ICalcOperationClass extends ICommonOperation {
    readonly operationName: string;
    readonly symbol: string;
    readonly priority: number;
    readonly exSymbols?: Array<string>;

    readonly canBePlacedAfterOtherOperation: boolean;
    readonly canBePlacedBeforeOtherOperation: boolean;
    readonly hasOwnFullCalculateFunc: boolean;

    parseCheck(exprStructure: ExprStructureType, index: number): void;

    getRightNum(
        exprStructure: ExprStructureType,
        index: number
    ): {
        rightNum?: number | CalcOperationClass | ExprStructureType;
        isExistRightNum?: boolean;
    };
    getLeftNum(
        exprStructure: ExprStructureType,
        index: number
    ): {
        leftNum?: number | CalcOperationClass | ExprStructureType;
        isExistLeftNum?: boolean;
    };
    getPrevExprElem(
        exprStructure: ExprStructureType,
        index: number
    ): {
        prevExprElem?: number | CalcOperationClass | ExprStructureType;
        isExistPrevExprElem?: boolean;
    };
    getNextExprElem(
        exprStructure: ExprStructureType,
        index: number
    ): {
        nextExprElem?: number | CalcOperationClass | ExprStructureType;
        isExistNextExprElem?: boolean;
    };

    argumentsNotFound(exprStructure: ExprStructureType, index: number): void;
    stepByStepOperations(exprStructure: ExprStructureType, index: number): void;
    numOnRightMustBe(isExistLeftNum: boolean | undefined): void;
    numOnRightMustNotBe(isExistLeftNum: boolean | undefined): void;
    exprOnLeftMustNotBeNum(isExistLeftNum: boolean | undefined): void;

    calculate(params: { [key: string]: any }): ExpressionType;
}

export default class CalcOperationClass extends CommonOperationClass implements ICalcOperationClass {
    constructor(
        readonly operationName: string,
        readonly symbol: string,
        readonly priority: number,
        readonly exSymbols: Array<string> = []
    ) {
        super(symbol, exSymbols);
        this.operationName = operationName;
        this.priority = priority;
    }

    readonly canBePlacedAfterOtherOperation: boolean = false;
    readonly canBePlacedBeforeOtherOperation: boolean = false;

    readonly hasOwnFullCalculateFunc: boolean = false;

    parseCheck(exprStructure: ExprStructureType, index: number): void {
        this.argumentsNotFound(exprStructure, index);
    }

    getRightNum(
        exprStructure: ExprStructureType,
        index: number
    ): {
        rightNum?: number | CalcOperationClass | ExprStructureType;
        isExistRightNum?: boolean;
    } {
        const rightNumIndex = index + 1;
        const isExistRightNum = rightNumIndex < exprStructure.length && isNumber(exprStructure[rightNumIndex]);

        if (isExistRightNum) {
            const rightNum = exprStructure[rightNumIndex];

            return { rightNum, isExistRightNum };
        }

        return { isExistRightNum };
    }

    getLeftNum(
        exprStructure: ExprStructureType,
        index: number
    ): {
        leftNum?: number | CalcOperationClass | ExprStructureType;
        isExistLeftNum?: boolean;
    } {
        const leftNumIndex = index - 1;
        const isExistLeftNum = leftNumIndex >= 0 && isNumber(exprStructure[leftNumIndex]);

        if (isExistLeftNum) {
            const leftNum = exprStructure[leftNumIndex];

            return { leftNum, isExistLeftNum };
        }

        return { isExistLeftNum };
    }

    getPrevExprElem(
        exprStructure: ExprStructureType,
        index: number
    ): {
        prevExprElem?: number | CalcOperationClass | ExprStructureType;
        isExistPrevExprElem?: boolean;
    } {
        const prevExprElemIndex = index - 1;

        const isExistPrevExprElem = prevExprElemIndex >= 0;

        if (isExistPrevExprElem) {
            const prevExprElem = exprStructure[prevExprElemIndex];

            return { prevExprElem, isExistPrevExprElem };
        }

        return { isExistPrevExprElem };
    }

    getNextExprElem(
        exprStructure: ExprStructureType,
        index: number
    ): {
        nextExprElem?: number | CalcOperationClass | ExprStructureType;
        isExistNextExprElem?: boolean;
    } {
        const nextExprElemIndex = index + 1;

        const isExistNextExprElem = nextExprElemIndex < exprStructure.length;

        if (isExistNextExprElem) return { nextExprElem: exprStructure[nextExprElemIndex], isExistNextExprElem };

        return { isExistNextExprElem };
    }

    // common parse checkers
    argumentsNotFound(exprStructure: ExprStructureType, index: number): void {
        const { prevExprElem, isExistPrevExprElem } = this.getPrevExprElem(exprStructure, index);
        const { nextExprElem, isExistNextExprElem } = this.getNextExprElem(exprStructure, index);

        if (
            !(
                (isExistPrevExprElem || isExistNextExprElem) &&
                (isNumber(prevExprElem) ||
                    this.canBePlacedAfterOtherOperation ||
                    (isExistNextExprElem &&
                        nextExprElem instanceof CalcOperationClass &&
                        nextExprElem.canBePlacedBeforeOtherOperation) ||
                    isNumber(nextExprElem) ||
                    this.canBePlacedBeforeOtherOperation ||
                    (isExistNextExprElem &&
                        nextExprElem instanceof CalcOperationClass &&
                        nextExprElem.canBePlacedAfterOtherOperation))
            )
        ) {
            throw new Error(`Arguments for ${this.operationName} not found`);
        }
    }
    stepByStepOperations(exprStructure: ExprStructureType, index: number): void {
        const { prevExprElem, isExistPrevExprElem } = this.getPrevExprElem(exprStructure, index);
        const { nextExprElem, isExistNextExprElem } = this.getNextExprElem(exprStructure, index);

        if (
            (isExistPrevExprElem &&
                prevExprElem instanceof CalcOperationClass &&
                !prevExprElem.canBePlacedBeforeOtherOperation &&
                !this.canBePlacedAfterOtherOperation) ||
            (isExistNextExprElem &&
                nextExprElem instanceof CalcOperationClass &&
                !nextExprElem.canBePlacedAfterOtherOperation &&
                !this.canBePlacedBeforeOtherOperation)
        ) {
            throw new Error(`The ${this.operationName} cannot be performed before other operation`);
        }
    }
    numOnRightMustBe(isExistRightNum: boolean | undefined): void {
        if (!isExistRightNum) throw new Error(`The ${this.operationName} operation need an argument on the right`);
    }
    numOnRightMustNotBe(isExistRightNum: boolean | undefined): void {
        if (isExistRightNum) throw new Error(`The ${this.operationName} operation mustn't has a number on the right`);
    }
    exprOnLeftMustNotBeNum(isExistLeftNum: boolean | undefined): void {
        if (isExistLeftNum) throw new Error(`The ${this.operationName} operation mustn't has any number on the left`);
    }

    calculate(params: { [key: string]: any }): ExpressionType {
        const defaultExpr = [0];
        return defaultExpr;
    }
}
