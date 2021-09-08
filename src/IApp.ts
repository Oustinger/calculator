import { IFormatOperations, TFormatOperation } from './redux/calc/calcSelectors';

export type TInputFunc = (symbol?: string) => {};

export type TFormatOperationWithFunc = TFormatOperation & {
    func: TInputFunc;
};

export type IFormatOperationsWithFunc = {
    [operationName: string]: TFormatOperationWithFunc;
};

export type TOperationsBlock = TFormatOperationWithFunc[];

export interface IMapStateToProps {
    inputVal: string;
    expression: string;
    error: string;
    numbersInputs: IFormatOperations;
    parenthesesOperations: IFormatOperations;
    defaultOperations: IFormatOperations;
    calcOperations: IFormatOperations;
}

export type TInputFunctions = {
    addSymbol: TInputFunc;
    calculate: TInputFunc;
    clean: TInputFunc;
    deleteLastSymbol: TInputFunc;
};

export interface IMapDispatchToProps {
    setInput: (value: string) => {};
    inputFuncs: TInputFunctions;
}

export type AppProps = IMapStateToProps & IMapDispatchToProps;
