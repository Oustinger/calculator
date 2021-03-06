import arrayHelper from '../../../../utils/arrayHelper';
import isNumber from '../../../../utils/isNumber';
import { ICalculateExpr, TExpression } from '../../../calculateResult/calculateResult';
import CalcOperationClass from '../calcOperationClass';
import argumentsNotFound from '../validators/checkers/argumentsNotFound';
import numOnRightMustNotBe from '../validators/checkers/numOnRightMustNotBe';
import CalcOperationValidatorCreator from '../validators/CalcOperationValidatorCreator';

class Percent extends CalcOperationClass {
    readonly canBePlacedBeforeOtherOperation: boolean = true;
    readonly hasOwnFullCalculateFunc: boolean = true;

    calculate(params: {
        expr: TExpression;
        calculateExpr: (params: ICalculateExpr) => number;
        operationIndex: number;
    }): TExpression {
        const { expr, calculateExpr, operationIndex } = params;

        // checking operation before (on the left) this operation
        // (there is should be only one operation with priority = 0 or no one at all)
        if (!(1 <= operationIndex && operationIndex <= 3)) {
            // if false we need to calc part of expression on the left
            const exprLastIndexToCalc = operationIndex - 2;
            const newLeftPart = calculateExpr({ expr: expr.slice(0, exprLastIndexToCalc), index: 0 });

            const newExprStructure = [newLeftPart, ...expr.slice(exprLastIndexToCalc)];
            const newOperationIndex = 3;

            return this.calculate({ expr: newExprStructure, calculateExpr, operationIndex: newOperationIndex });
        }

        const mainNumIndex = operationIndex - 3;
        const isExistMainNum = mainNumIndex >= 0;
        const mainNum = isExistMainNum ? expr[mainNumIndex] : 1;

        const secondaryNumIndex = operationIndex - 1;
        const secondaryNum = expr[secondaryNumIndex];

        if (isNumber(mainNum) && isNumber(secondaryNum)) {
            const result: number = (mainNum / 100) * secondaryNum;

            const newExprStructure = arrayHelper.changeItemsOnItem(
                expr,
                result,
                secondaryNumIndex - 1,
                operationIndex + 1
            );

            return newExprStructure;
        }

        throw new Error('Some of percent operation arguments is not a number');
    }
}

const validators = [
    new CalcOperationValidatorCreator(argumentsNotFound),
    new CalcOperationValidatorCreator(numOnRightMustNotBe),
];

const percent = new Percent('percent', '%', 2, validators);

export default percent;
