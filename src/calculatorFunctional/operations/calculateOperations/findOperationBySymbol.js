import calcOperations from './calcOperations';

const findOperationBySymbol = (symbol) => Object.values(calcOperations)
    .find((operation) => operation.checkIsOperation(symbol));

export default findOperationBySymbol;