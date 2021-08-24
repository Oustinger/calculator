export default class CommonOperationClass {
    constructor (symbol, keyCode = null, exSymbols = []) {
        this.symbol = symbol;
        this.keyCode = keyCode;
        this.exSymbols = exSymbols;
    }

    getSymbol () {
        return this.symbol;
    };

    getCorrectSymbol () {
        return this.symbol;
    };

    getKeyCode () {
        return this.keyCode;
    };

    checkIsOperation (symbol) {
        return this.symbol === symbol || this.exSymbols.includes(symbol);
    };
}