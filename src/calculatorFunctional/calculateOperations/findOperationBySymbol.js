import addition from './operations/addition';
import division from './operations/division';
import multiplication from './operations/multiplication';
import percent from './operations/percent';
import squareRoot from './operations/squareRoot';
import subtraction from './operations/subtraction';

const operations = [
    addition, division, multiplication,
    percent, squareRoot, subtraction,
];

const findOperationBySymbol = (symbol) => operations.find((operation) => operation.checkOperation(symbol));

export default findOperationBySymbol;