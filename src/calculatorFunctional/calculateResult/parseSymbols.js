import arrayHelper from '../../utils/arrayHelper';
import isNumber from '../../utils/isNumber';
import findOperationBySymbol from '../operations/calculateOperations/findOperationBySymbol';
import findNumberInputBySymbol from '../operations/numbersInputs/findNumberInputBySymbol';
import findParenthesis from '../operations/parentheses/findParenthesis';

const checkParenthesisPairFinder = (count, checkType) => {
    const errorMessage = 'Some parenthesis pair not found';

    switch (checkType) {
        case 'result': {
            if (count !== 0)
                throw new Error(errorMessage);
            break;
        }
        case 'onClose': {
            if (!(count > 0))
                throw new Error(errorMessage);
            break;
        }
        default: {
            if (count < 0)
                throw new Error(errorMessage);
        }
    }
}

const parse = (symbols, index = 0, parenthesisPairFinder = 0, exprStructure = []) => {
    if (index === symbols.length) {
        if (index === 0)
            throw new Error('First write the expression');

        checkParenthesisPairFinder(parenthesisPairFinder, 'result');
        return exprStructure;
    }

    const symbol = symbols[index];

    // parse parentheses
    checkParenthesisPairFinder(parenthesisPairFinder);
    const parenthesis = findParenthesis(symbol);
    if (parenthesis) {
        if (parenthesis.getType() === 'open') {
            const {
                closeParenthesisIndex, thisParenthesesExprStructure, newParenthesisPairFinder
            } = parse(symbols, index + 1, parenthesisPairFinder + 1);

            const newExprStructure = arrayHelper.changeItemsOnItem(
                exprStructure, thisParenthesesExprStructure, index - 1
            );

            return parse(
                symbols, closeParenthesisIndex + 1, newParenthesisPairFinder, newExprStructure
            );
        }
        if (parenthesis.getType() === 'close') {
            checkParenthesisPairFinder(parenthesisPairFinder, 'onClose');
            return {
                closeParenthesisIndex: index,
                thisParenthesesExprStructure: exprStructure,
                newParenthesisPairFinder: parenthesisPairFinder - 1,
            };
        }
    }

    // parse numbers inputs
    const numberInput = findNumberInputBySymbol(symbol);
    if (numberInput) {
        const correctSymbol = numberInput.getMathCorrectSymbol();

        const lastIndex = exprStructure.length - 1;
        const lastElement = exprStructure[lastIndex];
        const nextSymbolIndex = index + 1;
        const isNextSymbolNumber = !!findNumberInputBySymbol(symbols[nextSymbolIndex]);

        if (isNumber(Number.parseFloat(lastElement))) {
            const newLastElement = lastElement + correctSymbol;
            const exprStructureWithOutLastElem = exprStructure.slice(0, lastIndex);

            if (!isNextSymbolNumber)
                return parse(
                    symbols, index + 1, parenthesisPairFinder,
                    [...exprStructureWithOutLastElem, Number.parseFloat(newLastElement)],
                );

            return parse(symbols, index + 1, parenthesisPairFinder, [...exprStructureWithOutLastElem, newLastElement]);
        }

        if (!isNextSymbolNumber)
            return parse(
                symbols, index + 1, parenthesisPairFinder, [...exprStructure, Number.parseFloat(correctSymbol)]
            );

        return parse(symbols, index + 1, parenthesisPairFinder, [...exprStructure, correctSymbol]);
    }

    // parse calc operations
    const operation = findOperationBySymbol(symbol);
    if (operation)
        return parse(symbols, index + 1, parenthesisPairFinder, [...exprStructure, operation]);

    throw new Error(`Unknown symbol: " ${symbol} "`);
};

const checkByOperationsCheckers = (exprStructure, index = 0) => {
    if (index === exprStructure.length)
        return;

    const element = exprStructure[index];

    if (Array.isArray(element)) {
        checkByOperationsCheckers(element);
        return;
    }

    if (!isNumber(element))
        element.parseCheck(exprStructure, index);

    checkByOperationsCheckers(exprStructure, index + 1);
};

const parseSymbols = (symbols) => {
    const exprStructure = parse(symbols.split(''));

    try {
        checkByOperationsCheckers(exprStructure);

        return exprStructure;
    } catch (error) {
        throw error;
    }
};

export default parseSymbols;