import CommonOperationClass from '../../commonOperationClass';

class Comma extends CommonOperationClass {
    getCorrectSymbol() {
        return this.exSymbols[0];
    }
}

const comma = new Comma(',', 188, ['.']);

export default comma;