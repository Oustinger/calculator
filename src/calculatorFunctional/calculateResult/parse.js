import isNumber from './../../utils/isNumber';
import findOperationBySymbol from './../calculateOperations/findOperationBySymbol';
import findNumberInputBySymbol from './../numbersInputs/findNumberInputBySymbol';

const parse = (symbols) => {
    const exprStructure = symbols.split('').reduce((acc, symbol, index, array) => {
        const numberInput = findNumberInputBySymbol(symbol);
        if (numberInput) {
            const correctSymbol = numberInput.getCorrectSymbol();

            const lastIndex = acc.length - 1;
            const lastElement = acc[lastIndex];
            const nextSymbolIndex = index + 1;
            const isNextSymbolNumber = !!findNumberInputBySymbol(array[nextSymbolIndex]);

            if (isNumber(Number.parseFloat(lastElement))) {
                const newLastElement = lastElement + correctSymbol;
                const accWithOutLastElem = acc.slice(0, lastIndex);

                if (!isNextSymbolNumber)
                    return [...accWithOutLastElem, Number.parseFloat(newLastElement)];

                return [...accWithOutLastElem, newLastElement];
            }

            if (!isNextSymbolNumber)
                return [...acc, Number.parseFloat(correctSymbol)];

            return [...acc, correctSymbol];
        }

        const operation = findOperationBySymbol(symbol);
        if (operation)
            return [...acc, operation];

        throw new Error(`Unknown symbol: " ${symbol} "`);
    }, []);

    try {
        // check by operations checkers
        exprStructure.forEach(
            (element, index) => {
                return isNumber(element) ? null : element.parseCheck(exprStructure, index)
            }
        );
        return exprStructure;
    } catch (error) {
        throw error;
    }
};

export default parse;