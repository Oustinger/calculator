import { TExprStructure } from '../../../calculateResult/parseSymbols';
import { ICalcOperationClass } from '../calcOperationClass';

export type TParseCheckerMethodParams = {
    operationValidateAPI: TCalcOperationValidateAPI;
    leftNumValidateAPI: TLeftNumValidateAPI;
    rightNumValidateAPI: TRightNumValidateAPI;
    prevExprElemValidateAPI: TPrevExprElemValidateAPI;
    nextExprElemValidateAPI: TNextExprElemValidateAPI;
};

export type TParseCheckerMethod = (params: TParseCheckerMethodParams) => void;

export type TCalcOperationValidateAPI = {
    operationName: string;
    canBePlacedAfterOtherOperation: boolean;
    canBePlacedBeforeOtherOperation: boolean;
};

export type TRightNumValidateAPI = {
    isExist?: boolean;
    number?: number;
};

export type TLeftNumValidateAPI = {
    isExist?: boolean;
    number?: number;
};

export type TPrevExprElemValidateAPI = {
    isExist?: boolean;
    isNumber?: boolean;
    isInstanceofCalcOperation?: boolean;
    canBePlacedBeforeOtherOperation?: boolean;
    canBePlacedAfterOtherOperation?: boolean;
};

export type TNextExprElemValidateAPI = {
    isExist?: boolean;
    isNumber?: boolean;
    isInstanceofCalcOperation?: boolean;
    canBePlacedBeforeOtherOperation?: boolean;
    canBePlacedAfterOtherOperation?: boolean;
};

export interface IParseChecker {
    readonly checkMethod: TParseCheckerMethod;
    check: (operation: ICalcOperationClass, exprStructure: TExprStructure, index: number) => void;
    getOperationValidateAPI: (operation: ICalcOperationClass) => TCalcOperationValidateAPI;
    getLeftNumValidateAPI: (exprStructure: TExprStructure, index: number) => TLeftNumValidateAPI;
    getRightNumValidateAPI: (exprStructure: TExprStructure, index: number) => TRightNumValidateAPI;
    getPrevExprElemValidateAPI: (exprStructure: TExprStructure, index: number) => TPrevExprElemValidateAPI;
    getNextExprElemValidateAPI: (exprStructure: TExprStructure, index: number) => TNextExprElemValidateAPI;
}
