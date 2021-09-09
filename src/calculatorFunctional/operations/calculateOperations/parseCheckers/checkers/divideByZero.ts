import { TParseCheckerMethod, TParseCheckerMethodParams } from '../IParseCheckerCreator';

const divideByZero: TParseCheckerMethod = ({ rightNumValidateAPI }: TParseCheckerMethodParams): void => {
    if (rightNumValidateAPI.number === 0) throw new Error('You cannot divide by zero');
};

export default divideByZero;
