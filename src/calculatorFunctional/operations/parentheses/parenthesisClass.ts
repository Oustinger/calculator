import CommonOperationClass, { CommonOperationInterface } from "../commonOperationClass";

export interface ParenthesisInterface extends CommonOperationInterface {
    readonly symbol: string,
    readonly type: string,
    getType(): string,
}

class ParenthesisClass extends CommonOperationClass implements ParenthesisInterface {
    constructor(
        readonly symbol: string,
        readonly type: string
    ) {
        super(symbol);
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}

export default ParenthesisClass;