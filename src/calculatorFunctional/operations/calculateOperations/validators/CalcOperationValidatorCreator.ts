import isNumber from '../../../../utils/isNumber';
import { TExprStructure } from '../../../calculateResult/parseSymbols';
import { ICalcOperationClass } from '../calcOperationClass';
import isCalcOperationInstance from '../isInstanceofCalcOperation';
import {
    ICalcOperationValidator,
    TCalcOperationValidateAPI,
    TLeftNumValidateAPI,
    TNextExprElemValidateAPI,
    TCalcOperationValidatorMethod,
    TPrevExprElemValidateAPI,
    TRightNumValidateAPI,
} from './ICalcOperationValidatorCreator';

class CalcOperationValidatorCreator implements ICalcOperationValidator {
    readonly checkMethod: TCalcOperationValidatorMethod;

    constructor(checkMethod: TCalcOperationValidatorMethod) {
        this.checkMethod = checkMethod;
    }

    check(operation: ICalcOperationClass, exprStructure: TExprStructure, index: number): void {
        this.checkMethod({
            operationValidateAPI: this.getOperationValidateAPI(operation),
            leftNumValidateAPI: this.getLeftNumValidateAPI(exprStructure, index),
            rightNumValidateAPI: this.getRightNumValidateAPI(exprStructure, index),
            prevExprElemValidateAPI: this.getPrevExprElemValidateAPI(exprStructure, index),
            nextExprElemValidateAPI: this.getNextExprElemValidateAPI(exprStructure, index),
        });
    }

    getOperationValidateAPI(operation: ICalcOperationClass): TCalcOperationValidateAPI {
        return {
            operationName: operation.operationName,
            canBePlacedAfterOtherOperation: operation.canBePlacedAfterOtherOperation,
            canBePlacedBeforeOtherOperation: operation.canBePlacedBeforeOtherOperation,
        };
    }

    getLeftNumValidateAPI(exprStructure: TExprStructure, index: number): TLeftNumValidateAPI {
        const leftNumIndex = index - 1;
        const isExist = leftNumIndex >= 0 && isNumber(exprStructure[leftNumIndex]);

        const result: TLeftNumValidateAPI = { isExist };

        if (isExist) {
            const leftNum = exprStructure[leftNumIndex];

            if (isNumber(leftNum)) result.number = leftNum;
        }

        return result;
    }

    getRightNumValidateAPI(exprStructure: TExprStructure, index: number): TRightNumValidateAPI {
        const rightNumIndex = index + 1;
        const isExist = rightNumIndex < exprStructure.length && isNumber(exprStructure[rightNumIndex]);

        const result: TRightNumValidateAPI = { isExist };

        if (isExist) {
            const rightNum = exprStructure[rightNumIndex];

            if (isNumber(rightNum)) result.number = rightNum;
        }

        return result;
    }

    getPrevExprElemValidateAPI(exprStructure: TExprStructure, index: number): TPrevExprElemValidateAPI {
        const prevExprElemIndex = index - 1;

        const isExist = prevExprElemIndex >= 0;

        const result: TPrevExprElemValidateAPI = { isExist };

        if (isExist) {
            const prevExprElem = exprStructure[prevExprElemIndex];

            const isInstanceofCalcOperationValue = isCalcOperationInstance(prevExprElem);

            result.isNumber = isNumber(prevExprElem);
            result.isInstanceofCalcOperation = isInstanceofCalcOperationValue;

            if (isCalcOperationInstance(prevExprElem)) {
                result.canBePlacedBeforeOtherOperation = prevExprElem.canBePlacedBeforeOtherOperation;
                result.canBePlacedAfterOtherOperation = prevExprElem.canBePlacedAfterOtherOperation;
            }
        }

        return result;
    }

    getNextExprElemValidateAPI(exprStructure: TExprStructure, index: number): TNextExprElemValidateAPI {
        const nextExprElemIndex = index + 1;

        const isExist = nextExprElemIndex < exprStructure.length;

        const result: TNextExprElemValidateAPI = { isExist };

        if (isExist) {
            const nextExprElem = exprStructure[nextExprElemIndex];

            const isInstanceofCalcOperationValue = isCalcOperationInstance(nextExprElem);

            result.isNumber = isNumber(nextExprElem);
            result.isInstanceofCalcOperation = isInstanceofCalcOperationValue;

            if (isCalcOperationInstance(nextExprElem)) {
                result.canBePlacedBeforeOtherOperation = nextExprElem.canBePlacedBeforeOtherOperation;
                result.canBePlacedAfterOtherOperation = nextExprElem.canBePlacedAfterOtherOperation;
            }
        }

        return result;
    }
}

export default CalcOperationValidatorCreator;
