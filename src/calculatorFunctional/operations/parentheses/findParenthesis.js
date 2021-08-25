import parentheses from './parentheses';

const findParenthesis = (symbol) => Object.values(parentheses)
    .find((parenthesis) => parenthesis.checkIsOperation(symbol));

export default findParenthesis;