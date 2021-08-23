import isNumber from './../../utils/isNumber';
import parse from './parse';

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
    const result = makeCalculations(exprStructure, 0);
    const formattedResult = result.toString().split('')
        .map(number => number === '.' ? ',' : number)
        .reduce((acc, number) => `${acc}${number}`);

    return formattedResult;
};

export default calculateResult;