import closeParenthesis from './operations/closeParenthesis';
import openParenthesis from './operations/openParenthesis';
import { ParenthesisInterface } from './parenthesisClass';

export interface ParenthesesInterface {
    [key: string]: ParenthesisInterface;
}

const parentheses: ParenthesesInterface = { openParenthesis, closeParenthesis };

export default parentheses;
