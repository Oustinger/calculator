import CommonOperationClass from '../../commonOperationClass';

class Comma extends CommonOperationClass {
    getMathCorrectSymbol() {
        return this.exSymbols[0];
    }
}

const comma = new Comma(',', ['.']);

export default comma;