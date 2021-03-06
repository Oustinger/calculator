import closeParenthesis from './operations/closeParenthesis';
import openParenthesis from './operations/openParenthesis';
import { IParenthesis } from './parenthesisClass';

export interface IParentheses {
    [parenthesisName: string]: IParenthesis;
}

const parentheses: IParentheses = { openParenthesis, closeParenthesis };

export default parentheses;
