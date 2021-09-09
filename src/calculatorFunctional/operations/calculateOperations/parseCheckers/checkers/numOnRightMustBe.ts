import { TParseCheckerMethod, TParseCheckerMethodParams } from '../IParseCheckerCreator';

const numOnRightMustBe: TParseCheckerMethod = ({
    operationValidateAPI,
    rightNumValidateAPI,
}: TParseCheckerMethodParams): void => {
    if (!rightNumValidateAPI.isExist)
        throw new Error(`The ${operationValidateAPI.operationName} operation need an argument on the right`);
};

export default numOnRightMustBe;
