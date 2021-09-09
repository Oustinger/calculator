import arrayHelper from '../../utils/arrayHelper';
import isNumber from '../../utils/isNumber';
import CalcOperationClass from '../operations/calculateOperations/calcOperationClass';
import findOperationBySymbol from '../operations/calculateOperations/findOperationBySymbol';
import isCalcOperationInstance from '../operations/calculateOperations/isInstanceofCalcOperation';
import findNumberInputBySymbol from '../operations/numbersInputs/findNumberInputBySymbol';
import findParenthesis from '../operations/parentheses/findParenthesis';

export type TExprStructure = Array<number | CalcOperationClass | TExprStructure>;

export const isExprStructureInstance = (exprStructureInstance: any): exprStructureInstance is TExprStructure => {
    if (Array.isArray(exprStructureInstance)) {
        return exprStructureInstance.reduce(
            (acc, element) =>
                isNumber(element) || isCalcOperationInstance(element) || isExprStructureInstance(element) ? true : acc,
            false
        );
    }

    return false;
};

const checkParenthesisPairFinder = (count: number, checkType?: string): void => {
    const errorMessage = 'Some parenthesis pair not found';

    switch (checkType) {
        case 'result': {
            if (count !== 0) throw new Error(errorMessage);
            break;
        }
        case 'onClose': {
            if (!(count > 0)) throw new Error(errorMessage);
            break;
        }
        default: {
            if (count < 0) throw new Error(errorMessage);
        }
    }
};

function hasStringExprStructure(exprStructure: TExprStructureWithString): exprStructure is TExprStructureWithString {
    return !!exprStructure.find((exprChild) => {
        if (exprChild instanceof Array) return hasStringExprStructure(exprChild);

        return typeof exprChild === 'string';
    });
}

type TExprStructureWithString = Array<number | CalcOperationClass | TExprStructure | string>;

interface IParse {
    symbols: Array<string>;
    index: number;
    parenthesisPairFinder: number;
    exprStructure: TExprStructureWithString;
}

const parse = (
    symbols: Array<string>,
    index: number = 0,
    parenthesisPairFinder: number = 0,
    exprStructure: TExprStructureWithString = []
): TExprStructure | IParse => {
    const symbol = symbols[index];

    if (!symbol) {
        if (index === 0) throw new Error('First write the expression');

        checkParenthesisPairFinder(parenthesisPairFinder, 'result');

        if (hasStringExprStructure(exprStructure))
            throw new Error('Programming error: expression structure contain "string" in "parseSymbols" function');

        return exprStructure;
    }

    // parse parentheses
    checkParenthesisPairFinder(parenthesisPairFinder);
    const parenthesis = findParenthesis(symbol);
    if (parenthesis) {
        if (parenthesis.getType() === 'open') {
            const parseResult = parse(symbols, index + 1, parenthesisPairFinder + 1);

            if (isExprStructureInstance(parseResult)) return parseResult;

            const {
                index: closeParenthesisIndex,
                parenthesisPairFinder: newParenthesisPairFinder,
                exprStructure: thisParenthesesExprStructure,
            } = parseResult;

            const newExprStructure = arrayHelper.changeItemsOnItem(
                exprStructure,
                thisParenthesesExprStructure,
                index - 1
            );

            return parse(symbols, closeParenthesisIndex + 1, newParenthesisPairFinder, newExprStructure);
        }
        if (parenthesis.getType() === 'close') {
            checkParenthesisPairFinder(parenthesisPairFinder, 'onClose');
            return {
                symbols,
                index,
                parenthesisPairFinder: parenthesisPairFinder - 1,
                exprStructure: exprStructure,
            };
        }
    }

    // parse numbers inputs
    const numberInput = findNumberInputBySymbol(symbol);
    if (numberInput) {
        const correctSymbol = numberInput.getMathCorrectSymbol();

        const lastIndex = exprStructure.length - 1;
        const isExistLastElement = exprStructure.length > 0;
        const lastElement = exprStructure[lastIndex];
        const nextSymbolIndex = index + 1;
        const isNextSymbolNumber = !!findNumberInputBySymbol(symbols[nextSymbolIndex]);

        if (isExistLastElement && isNumber(Number.parseFloat(lastElement.toString()))) {
            const newLastElement = lastElement + correctSymbol;
            const exprStructureWithOutLastElem = exprStructure.slice(0, lastIndex);

            if (!isNextSymbolNumber)
                return parse(symbols, index + 1, parenthesisPairFinder, [
                    ...exprStructureWithOutLastElem,
                    Number.parseFloat(newLastElement),
                ]);

            return parse(symbols, index + 1, parenthesisPairFinder, [...exprStructureWithOutLastElem, newLastElement]);
        }

        if (!isNextSymbolNumber)
            return parse(symbols, index + 1, parenthesisPairFinder, [
                ...exprStructure,
                Number.parseFloat(correctSymbol),
            ]);

        return parse(symbols, index + 1, parenthesisPairFinder, [...exprStructure, correctSymbol]);
    }

    // parse calc operations
    const operation = findOperationBySymbol(symbol);
    if (operation) return parse(symbols, index + 1, parenthesisPairFinder, [...exprStructure, operation]);

    throw new Error(`Unknown symbol: " ${symbol} "`);
};

const validateCalcOperations = (exprStructure: TExprStructure, index: number = 0): void => {
    if (index === exprStructure.length) return;

    const element = exprStructure[index];

    if (isExprStructureInstance(element)) {
        validateCalcOperations(element);
        return;
    }

    if (isCalcOperationInstance(element)) element.validate(exprStructure, index);

    validateCalcOperations(exprStructure, index + 1);
};

const parseSymbols = (symbols: string): TExprStructure => {
    const exprStructure = parse(symbols.split(''));

    if (!isExprStructureInstance(exprStructure))
        throw new Error(
            'Programming error: expected an expression structure but received parse function "parseSymbols" function'
        );

    validateCalcOperations(exprStructure);

    return exprStructure;
};

export default parseSymbols;
