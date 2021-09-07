import addition from '../operations/calculateOperations/operations/addition';
import division from '../operations/calculateOperations/operations/division';
import multiplication from '../operations/calculateOperations/operations/multiplication';
import percent from '../operations/calculateOperations/operations/percent';
import squareRoot from '../operations/calculateOperations/operations/squareRoot';
import subtraction from '../operations/calculateOperations/operations/subtraction';
import parseSymbols from './parseSymbols';

test('empty expression', () => {
    const expression = '';

    expect(() => parseSymbols(expression)).toThrow('First write the expression');
});
describe('operations parse checkers', () => {
    test('argumentsNotFound', () => {
        const expression1 = '-';
        expect(() => parseSymbols(expression1)).toThrow('Arguments for subtraction not found');

        const expression2 = '1%-';
        expect(() => parseSymbols(expression2)).toThrow('Arguments for subtraction not found');
    });
    test('stepByStepOperations', () => {
        const expression = '2-+3';
        expect(() => parseSymbols(expression)).toThrow('The subtraction cannot be performed before other operation');
    });
    describe('squareRoot custom checkers', () => {
        test('numOnRightMustBe', () => {
            const expression1 = '2+√';
            expect(() => parseSymbols(expression1)).toThrow('The square root operation need an argument on the right');

            const expression2 = '2+√0';
            expect(() => parseSymbols(expression2)).not.toThrow(
                'The square root operation need an argument on the right'
            );
        });
        test('exprOnLeftMustNotBeNum', () => {
            const expression = '0√4';
            expect(() => parseSymbols(expression)).toThrow(
                "The square root operation mustn't has any number on the left"
            );
        });
    });
    describe('percent custom checkers', () => {
        test('numOnRightMustNotBe', () => {
            const expression = '10%0';
            expect(() => parseSymbols(expression)).toThrow("The percent operation mustn't has a number on the right");
        });
    });
    describe('division custom checkers', () => {
        test('divideByZero', () => {
            const expression = '10/0';
            expect(() => parseSymbols(expression)).toThrow('You cannot divide by zero');
        });
    });
});
describe('expressions with parentheses', () => {
    test('common', () => {
        const expression = '2×(1+4)';

        const exprStructure = parseSymbols(expression);

        expect(exprStructure).toStrictEqual([2, multiplication, [1, addition, 4]]);
    });
    test('empty parentheses', () => {
        const expression = '()';

        const exprStructure = parseSymbols(expression);

        expect(exprStructure).toStrictEqual([[]]);
    });
    test('without pair', () => {
        const expression1 = '(';
        const expression2 = ')';
        const expression3 = '(()';
        const expression4 = '())';

        expect(() => parseSymbols(expression1)).toThrow('Some parenthesis pair not found');
        expect(() => parseSymbols(expression2)).toThrow('Some parenthesis pair not found');
        expect(() => parseSymbols(expression3)).toThrow('Some parenthesis pair not found');
        expect(() => parseSymbols(expression4)).toThrow('Some parenthesis pair not found');
    });
});
test('huge expression', () => {
    const expression = '-√0+6+4/√4×2+50%-10/2+((10*5-20%)/(12/6))';

    const exprStructure = parseSymbols(expression);

    expect(exprStructure).toEqual([
        subtraction,
        squareRoot,
        0,
        addition,
        6,
        addition,
        4,
        division,
        squareRoot,
        4,
        multiplication,
        2,
        addition,
        50,
        percent,
        subtraction,
        10,
        division,
        2,
        addition,
        [[10, multiplication, 5, subtraction, 20, percent], division, [12, division, 6]],
    ]);
});
