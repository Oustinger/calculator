import { TCalcOperationValidatorMethod, TCalcOperationValidatorMethodParams } from '../ICalcOperationValidatorCreator';

const divideByZero: TCalcOperationValidatorMethod = ({
    rightNumValidateAPI,
}: TCalcOperationValidatorMethodParams): void => {
    if (rightNumValidateAPI.number === 0) throw new Error('You cannot divide by zero');
};

export default divideByZero;
