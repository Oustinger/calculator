export interface ICommonOperation {
    readonly symbol: string;
    readonly exSymbols?: string[];
    getSymbol(): string;
    getExSymbols(): string[];
    getMathCorrectSymbol(): string;
    checkIsOperation(symbol: string): boolean;
}

export default class CommonOperationClass implements ICommonOperation {
    constructor(readonly symbol: string, readonly exSymbols: string[] = []) {
        this.symbol = symbol;
        this.exSymbols = exSymbols;
    }

    getSymbol(): string {
        return this.symbol;
    }

    getExSymbols(): string[] {
        return this.exSymbols;
    }

    getMathCorrectSymbol(): string {
        return this.symbol;
    }

    checkIsOperation(symbol: string): boolean {
        return this.symbol === symbol || this.exSymbols.includes(symbol);
    }
}
