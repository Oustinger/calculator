import isNumber from './../../utils/isNumber';
import findOperationBySymbol from './../calculateOperations/findOperationBySymbol';
import { isSymbolNumberInput } from './../numbersInputs/numbersInputs';

export const parse = (symbols) => {
    const exprStructure = symbols.split('').reduce((acc, symbol, index) => {
        if (isSymbolNumberInput(symbol)) {
            const lastIndex = acc.length - 1;
            if (isNumber(acc[lastIndex])) {
                const newLastElement = Number.parseFloat(acc[lastIndex] + symbol);
                return [...acc.slice(0, lastIndex), newLastElement];
            }

            const newLastElement = Number.parseInt(symbol);
            return [...acc, newLastElement];
        }

        return [...acc, findOperationBySymbol(symbol)];
    }, []);

    try {
        // check by operations checkers
        exprStructure.forEach(
            (element, index) => isNumber(element) ? null : element.parseCheck(exprStructure, index)
        );
        return exprStructure;
    } catch (error) {
        throw error;
    }
};

const calculateResult = (expression) => {
    const makeCalculations = (exprStructure, index, maxPriority = -1, maxPriorityOperationIndex = null) => {
        if (exprStructure.length === 1) {
            return exprStructure[0];
        }

        if (index === exprStructure.length) {
            const operation = exprStructure[maxPriorityOperationIndex];

            if (operation.hasOwnFullCalculateFunc) {
                const newExprStructure = operation.calculate(
                    exprStructure, makeCalculations, maxPriorityOperationIndex
                );
                return makeCalculations(newExprStructure, 0);
            }

            const leftNumIndex = maxPriorityOperationIndex - 1;
            const isExistLeftNum = (leftNumIndex >= 0) && isNumber(exprStructure[leftNumIndex]);
            const leftNum = isExistLeftNum ? exprStructure[leftNumIndex] : null;

            const rightNumIndex = maxPriorityOperationIndex + 1;
            const isExistRightNum = (rightNumIndex < index) && isNumber(exprStructure[rightNumIndex]);
            const rightNum = isExistRightNum ? exprStructure[rightNumIndex] : null;

            const result = operation.calculate(leftNum, rightNum);

            const newExprStructure = [
                ...exprStructure.slice(0, isExistLeftNum ? leftNumIndex : leftNumIndex + 1),
                result,
                ...exprStructure.slice(isExistRightNum ? rightNumIndex + 1 : rightNumIndex),
            ];

            return makeCalculations(newExprStructure, 0);
        }

        const exprChild = exprStructure[index];

        const isExprChildNumber = isNumber(exprChild);
        if (isExprChildNumber)
            return makeCalculations(exprStructure, index + 1, maxPriority, maxPriorityOperationIndex);

        // else exprChild is operation
        const currentPriority = exprChild.priority;
        if (currentPriority > maxPriority)
            return makeCalculations(exprStructure, index + 1, currentPriority, index);

        return makeCalculations(exprStructure, index + 1, maxPriority, maxPriorityOperationIndex);
    };

    const exprStructure = parse(expression);

    return makeCalculations(exprStructure, 0);
};

export default calculateResult;