import arrayHelper from '../../utils/arrayHelper';
import isNumber from './../../utils/isNumber';
import parseSymbols from './parseSymbols';

const calculateExpr = (expr, index = 0, maxPriority = -1, maxPriorityOperationIndex = null) => {
    if (expr.length === 0) {
        return 0;
    }

    if (expr.length === 1) {
        return expr[0];
    }

    if (index === expr.length) {
        const operation = expr[maxPriorityOperationIndex];

        if (operation.hasOwnFullCalculateFunc) {
            const newExprStructure = operation.calculate(
                expr, calculateExpr, maxPriorityOperationIndex
            );
            return calculateExpr(newExprStructure, 0);
        }

        const leftNumIndex = maxPriorityOperationIndex - 1;
        const isExistLeftNum = (leftNumIndex >= 0) && isNumber(expr[leftNumIndex]);
        const leftNum = isExistLeftNum ? expr[leftNumIndex] : null;

        const rightNumIndex = maxPriorityOperationIndex + 1;
        const isExistRightNum = (rightNumIndex < index) && isNumber(expr[rightNumIndex]);
        const rightNum = isExistRightNum ? expr[rightNumIndex] : null;

        const result = operation.calculate(leftNum, rightNum);

        const leftBorderIndex = isExistLeftNum ? leftNumIndex - 1 : leftNumIndex;
        const rightBorderIndex = isExistRightNum ? rightNumIndex + 1 : rightNumIndex;
        const newExprStructure = arrayHelper.changeItemsOnItem(expr, result, leftBorderIndex, rightBorderIndex);

        return calculateExpr(newExprStructure, 0);
    }

    const exprChild = expr[index];

    const isExprChildNumber = isNumber(exprChild);
    if (isExprChildNumber)
        return calculateExpr(expr, index + 1, maxPriority, maxPriorityOperationIndex);

    // else exprChild is operation
    const currentPriority = exprChild.priority;
    if (currentPriority > maxPriority)
        return calculateExpr(expr, index + 1, currentPriority, index);

    return calculateExpr(expr, index + 1, maxPriority, maxPriorityOperationIndex);
};

const makeCalculations = (exprStructure) => {
    if (isNumber(exprStructure))
        return exprStructure;

    const exprStructureWithOutParentheses = exprStructure.map(
        exprChild => (Array.isArray(exprChild) ? makeCalculations(exprChild) : exprChild)
    );

    return calculateExpr(exprStructureWithOutParentheses);
};

const calculateResult = (expression) => {
    const exprStructure = parseSymbols(expression);

    const result = makeCalculations(exprStructure);

    const formattedResult = result.toString().split('')
        .map(number => number === '.' ? ',' : number)
        .reduce((acc, number) => `${acc}${number}`);

    return formattedResult;
};

export default calculateResult;