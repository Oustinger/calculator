import parentheses from './parentheses';
import { IParenthesis } from './parenthesisClass';

const findParenthesis = (symbol: string): IParenthesis | undefined =>
    Object.values(parentheses).find((parenthesis) => parenthesis.checkIsOperation(symbol));

export default findParenthesis;
