import CommonOperationClass from '../../commonOperationClass';

class Comma extends CommonOperationClass {
    getMathCorrectSymbol(): string {
        return this.exSymbols[0];
    }
}

const comma = new Comma(',', ['.']);

export default comma;