import CommonOperationClass from '../../commonOperationClass';
import zero from './default/zero';

class DoubleZero extends CommonOperationClass {
    constructor(readonly symbols: CommonOperationClass[], readonly exSymbols: string[] = []) {
        super(
            symbols.reduce((acc, operation) => `${acc}${operation.getSymbol()}`, ''), // create superSymbol from symbols
            exSymbols
        );
    }
}

const doubleZero = new DoubleZero([zero, zero]);

export default doubleZero;
