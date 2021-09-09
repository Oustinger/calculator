import { TExpression } from '../../calculateResult/calculateResult';
import { TExprStructure } from '../../calculateResult/parseSymbols';
import CommonOperationClass, { ICommonOperation } from '../commonOperationClass';
import { ICalcOperationValidator } from './validators/ICalcOperationValidatorCreator';
export interface ICalcOperationClass extends ICommonOperation {
    readonly operationName: string;
    readonly symbol: string;
    readonly priority: number;
    readonly validators: ICalcOperationValidator[];
    readonly exSymbols?: Array<string>;

    readonly canBePlacedAfterOtherOperation: boolean;
    readonly canBePlacedBeforeOtherOperation: boolean;
    readonly hasOwnFullCalculateFunc: boolean;

    validate(exprStructure: TExprStructure, index: number): void;

    calculate(params: { [paramName: string]: any }): TExpression;
}

export default class CalcOperationClass extends CommonOperationClass implements ICalcOperationClass {
    constructor(
        readonly operationName: string,
        readonly symbol: string,
        readonly priority: number,
        readonly validators: ICalcOperationValidator[],
        readonly exSymbols: Array<string> = []
    ) {
        super(symbol, exSymbols);
        this.operationName = operationName;
        this.priority = priority;
        this.validators = validators;
    }

    readonly canBePlacedAfterOtherOperation: boolean = false;
    readonly canBePlacedBeforeOtherOperation: boolean = false;

    readonly hasOwnFullCalculateFunc: boolean = false;

    validate(exprStructure: TExprStructure, index: number): void {
        this.validators.forEach((validator) => validator.check(this, exprStructure, index));
    }

    calculate(params: { [paramName: string]: any }): TExpression {
        const defaultExpr = [0];
        return defaultExpr;
    }
}
