import { TCalcOperationValidatorMethod, TCalcOperationValidatorMethodParams } from '../ICalcOperationValidatorCreator';

const numOnRightMustNotBe: TCalcOperationValidatorMethod = ({
    operationValidateAPI,
    rightNumValidateAPI,
}: TCalcOperationValidatorMethodParams): void => {
    if (rightNumValidateAPI.isExist)
        throw new Error(`The ${operationValidateAPI.operationName} operation mustn't has a number on the right`);
};

export default numOnRightMustNotBe;
