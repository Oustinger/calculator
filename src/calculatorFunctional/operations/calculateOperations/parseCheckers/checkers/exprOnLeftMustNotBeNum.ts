import { TParseCheckerMethod, TParseCheckerMethodParams } from '../IParseCheckerCreator';

const exprOnLeftMustNotBeNum: TParseCheckerMethod = ({
    operationValidateAPI,
    leftNumValidateAPI,
}: TParseCheckerMethodParams): void => {
    if (leftNumValidateAPI.isExist)
        throw new Error(`The ${operationValidateAPI.operationName} operation mustn't has any number on the left`);
};

export default exprOnLeftMustNotBeNum;
