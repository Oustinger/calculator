import CommonOperationClass, { ICommonOperation } from '../commonOperationClass';

export interface IParenthesis extends ICommonOperation {
    readonly symbol: string;
    readonly type: string;
    getType(): string;
}

class ParenthesisClass extends CommonOperationClass implements IParenthesis {
    constructor(readonly symbol: string, readonly type: string) {
        super(symbol);
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}

export default ParenthesisClass;
