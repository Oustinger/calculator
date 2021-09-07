import parentheses from './parentheses';
import { ParenthesisInterface } from './parenthesisClass';

const findParenthesis = (symbol: string): ParenthesisInterface | undefined =>
    Object.values(parentheses).find((parenthesis) => parenthesis.checkIsOperation(symbol));

export default findParenthesis;
