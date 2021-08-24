export default class CommonOperationClass {
    constructor(symbol, exSymbols = []) {
        this.symbol = symbol;
        this.exSymbols = exSymbols;
    }

    getSymbol() {
        return this.symbol;
    };

    getExSymbols() {
        return this.exSymbols;
    };

    getMathCorrectSymbol() {
        return this.symbol;
    };

    checkIsOperation(symbol) {
        return this.symbol === symbol || this.exSymbols.includes(symbol);
    };
}