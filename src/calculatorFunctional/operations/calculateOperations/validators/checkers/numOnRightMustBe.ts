import { TCalcOperationValidatorMethod, TCalcOperationValidatorMethodParams } from '../ICalcOperationValidatorCreator';

const numOnRightMustBe: TCalcOperationValidatorMethod = ({
    operationValidateAPI,
    rightNumValidateAPI,
}: TCalcOperationValidatorMethodParams): void => {
    if (!rightNumValidateAPI.isExist)
        throw new Error(`The ${operationValidateAPI.operationName} operation need an argument on the right`);
};

export default numOnRightMustBe;
