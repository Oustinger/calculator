export interface CommonOperationInterface {
    readonly symbol: string,
    readonly exSymbols?: Array<string>,
    getSymbol(): string,
    getExSymbols(): Array<string>,
    getMathCorrectSymbol(): string,
    checkIsOperation(symbol: string): boolean,
}

export default class CommonOperationClass implements CommonOperationInterface {
    constructor(
        readonly symbol: string,
        readonly exSymbols: Array<string> = [],
    ) {
        this.symbol = symbol;
        this.exSymbols = exSymbols;
    }

    getSymbol(): string {
        return this.symbol;
    };

    getExSymbols(): Array<string> {
        return this.exSymbols;
    };

    getMathCorrectSymbol(): string {
        return this.symbol;
    };

    checkIsOperation(symbol: string): boolean {
        return this.symbol === symbol || this.exSymbols.includes(symbol);
    };
}