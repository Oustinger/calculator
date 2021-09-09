import { TCalcOperationValidatorMethod, TCalcOperationValidatorMethodParams } from '../ICalcOperationValidatorCreator';

const argumentsNotFound: TCalcOperationValidatorMethod = ({
    operationValidateAPI,
    prevExprElemValidateAPI,
    nextExprElemValidateAPI,
}: TCalcOperationValidatorMethodParams): void => {
    if (
        !(
            (prevExprElemValidateAPI.isExist || nextExprElemValidateAPI.isExist) &&
            (prevExprElemValidateAPI.isNumber ||
                operationValidateAPI.canBePlacedAfterOtherOperation ||
                (nextExprElemValidateAPI.isExist &&
                    nextExprElemValidateAPI.isInstanceofCalcOperation &&
                    nextExprElemValidateAPI.canBePlacedBeforeOtherOperation) ||
                nextExprElemValidateAPI.isNumber ||
                operationValidateAPI.canBePlacedBeforeOtherOperation ||
                (nextExprElemValidateAPI.isExist &&
                    nextExprElemValidateAPI.isInstanceofCalcOperation &&
                    nextExprElemValidateAPI.canBePlacedAfterOtherOperation))
        )
    ) {
        throw new Error(`Arguments for ${operationValidateAPI.operationName} not found`);
    }
};

export default argumentsNotFound;
