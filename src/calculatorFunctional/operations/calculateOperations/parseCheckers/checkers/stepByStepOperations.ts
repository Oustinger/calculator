import { TParseCheckerMethod, TParseCheckerMethodParams } from '../IParseCheckerCreator';

const stepByStepOperations: TParseCheckerMethod = ({
    operationValidateAPI,
    prevExprElemValidateAPI,
    nextExprElemValidateAPI,
}: TParseCheckerMethodParams): void => {
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
