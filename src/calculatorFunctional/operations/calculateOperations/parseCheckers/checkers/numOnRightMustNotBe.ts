import { TParseCheckerMethod, TParseCheckerMethodParams } from '../IParseCheckerCreator';

const numOnRightMustNotBe: TParseCheckerMethod = ({
    operationValidateAPI,
    rightNumValidateAPI,
}: TParseCheckerMethodParams): void => {
    if (rightNumValidateAPI.isExist)
        throw new Error(`The ${operationValidateAPI.operationName} operation mustn't has a number on the right`);
};

export default numOnRightMustNotBe;
