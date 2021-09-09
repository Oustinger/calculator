import { TCalcOperationValidatorMethod, TCalcOperationValidatorMethodParams } from '../ICalcOperationValidatorCreator';

const stepByStepOperations: TCalcOperationValidatorMethod = ({
    operationValidateAPI,
    prevExprElemValidateAPI,
    nextExprElemValidateAPI,
}: TCalcOperationValidatorMethodParams): void => {
    if (
        (prevExprElemValidateAPI.isExist &&
            prevExprElemValidateAPI.isInstanceofCalcOperation &&
            !prevExprElemValidateAPI.canBePlacedBeforeOtherOperation &&
            !operationValidateAPI.canBePlacedAfterOtherOperation) ||
        (nextExprElemValidateAPI.isExist &&
            nextExprElemValidateAPI.isInstanceofCalcOperation &&
            !nextExprElemValidateAPI.canBePlacedAfterOtherOperation &&
            !operationValidateAPI.canBePlacedBeforeOtherOperation)
    ) {
        throw new Error(`The ${operationValidateAPI.operationName} cannot be performed before other operation`);
    }
};

export default stepByStepOperations;
