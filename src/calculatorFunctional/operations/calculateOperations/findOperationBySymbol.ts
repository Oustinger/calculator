import CalcOperationClass from './calcOperationClass';
import calcOperations from './calcOperations';

const findOperationBySymbol = (symbol: string): CalcOperationClass | undefined => (
    Object.values(calcOperations)
        .find((operation) => operation.checkIsOperation(symbol))
);

export default findOperationBySymbol;