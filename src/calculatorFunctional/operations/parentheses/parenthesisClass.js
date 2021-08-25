import CommonOperationClass from "../commonOperationClass";

class Parenthesis extends CommonOperationClass {
    constructor(symbol, type) {
        super(symbol);

        this.type = type;
    }

    getType() {
        return this.type;
    }
}

export default Parenthesis;