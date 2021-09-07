import arrayHelper from '../../utils/arrayHelper';
import isNumber from '../../utils/isNumber';
import CalcOperationClass from '../operations/calculateOperations/calcOperationClass';
import parseSymbols, { ExprStructureType } from './parseSymbols';

export type ExpressionType = Array<number | CalcOperationClass>;

export interface CalculateExprInterface {
    expr: ExpressionType;
    index?: number;
    maxPriority?: number;
    maxPriorityOperationIndex?: number | null;
    [key: string]: ExpressionType | number | null | undefined;
}

const calculateExprDefValues: CalculateExprInterface = {
    expr: [],
    index: 0,
    maxPriority: -1,
    maxPriorityOperationIndex: null,
};

const calculateExpr = (params: CalculateExprInterface): number => {
    const { expr, index, maxPriority, maxPriorityOperationIndex } = { ...calculateExprDefValues, ...params };

    if (
        typeof index === 'undefined' ||
        typeof maxPriority === 'undefined' ||
        typeof maxPriorityOperationIndex === 'undefined'
    ) {
        throw new Error('Programming error: default values didn\'t set in "calculateExpr" function');
    }

    if (expr.length === 0) {
        return 0;
    }

    if (expr.length === 1) {
        if (expr[0] instanceof CalcOperationClass) {
            throw new Error('Programming error: expected a number but got an operation in "calculateExpr" function');
        }

        return expr[0];
    }

    if (index === expr.length && isNumber(maxPriorityOperationIndex)) {
        const operation = expr[maxPriorityOperationIndex];

        if (!(operation instanceof CalcOperationClass))
            throw new Error('Programming error: the number took for the operation in "calculateExpr" function');

        if (operation.hasOwnFullCalculateFunc) {
            const newExprStructure = operation.calculate({
                expr,
                calculateExpr,
                operationIndex: maxPriorityOperationIndex,
            });
            return calculateExpr({ expr: newExprStructure, index: 0 });
        }

        const leftNumIndex = maxPriorityOperationIndex - 1;
        const isExistLeftNum = leftNumIndex >= 0 && isNumber(expr[leftNumIndex]);
        const leftArg = isExistLeftNum ? expr[leftNumIndex] : null;

        const rightNumIndex = maxPriorityOperationIndex + 1;
        const isExistRightNum = rightNumIndex < index && isNumber(expr[rightNumIndex]);
        const rightArg = isExistRightNum ? expr[rightNumIndex] : null;

        const [result] = operation.calculate({ leftArg, rightArg });

        const leftBorderIndex = isExistLeftNum ? leftNumIndex - 1 : leftNumIndex;
        const rightBorderIndex = isExistRightNum ? rightNumIndex + 1 : rightNumIndex;
        const newExprStructure = arrayHelper.changeItemsOnItem(expr, result, leftBorderIndex, rightBorderIndex);

        return calculateExpr({ expr: newExprStructure, index: 0 });
    }

    const exprChild = expr[index];

    if (isNumber(exprChild)) return calculateExpr({ expr, index: index + 1, maxPriority, maxPriorityOperationIndex });

    // else exprChild is operation
    const currentPriority = exprChild.priority;
    if (currentPriority > maxPriority)
        return calculateExpr({
            expr,
            index: index + 1,
            maxPriority: currentPriority,
            maxPriorityOperationIndex: index,
        });

    return calculateExpr({ expr, index: index + 1, maxPriority, maxPriorityOperationIndex });
};

const makeCalculations = (exprStructure: ExprStructureType): number => {
    if (isNumber(exprStructure)) return exprStructure;

    const exprStructureWithOutParentheses: ExpressionType = exprStructure.map(
        (exprChild: number | CalcOperationClass | ExprStructureType): number | CalcOperationClass =>
            Array.isArray(exprChild) ? makeCalculations(exprChild) : exprChild
    );

    return calculateExpr({ expr: exprStructureWithOutParentheses });
};

const calculateResult = (expression: string): string => {
    try {
        const exprStructure = parseSymbols(expression);

        const result: number = makeCalculations(exprStructure);

        const formattedResult = result
            .toString()
            .split('')
            .map((number) => (number === '.' ? ',' : number))
            .reduce((acc, number) => `${acc}${number}`);

        return formattedResult;
    } catch (error) {
        throw error;
    }
};

export default calculateResult;
