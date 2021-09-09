import { TCalcOperationValidatorMethod, TCalcOperationValidatorMethodParams } from '../ICalcOperationValidatorCreator';

const exprOnLeftMustNotBeNum: TCalcOperationValidatorMethod = ({
    operationValidateAPI,
    leftNumValidateAPI,
}: TCalcOperationValidatorMethodParams): void => {
    if (leftNumValidateAPI.isExist)
        throw new Error(`The ${operationValidateAPI.operationName} operation mustn't has any number on the left`);
};

export default exprOnLeftMustNotBeNum;
