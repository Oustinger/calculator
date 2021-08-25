import addition from './../operations/calculateOperations/operations/addition';
import division from './../operations/calculateOperations/operations/division';
import multiplication from './../operations/calculateOperations/operations/multiplication';
import percent from './../operations/calculateOperations/operations/percent';
import squareRoot from './../operations/calculateOperations/operations/squareRoot';
import subtraction from './../operations/calculateOperations/operations/subtraction';
import parse from './parse';

describe('operations parse checkers', () => {
    test('argumentsNotFound', () => {
        const expression1 = '-';
        expect(() => parse(expression1)).toThrow('Arguments for subtraction not found');

        const expression2 = '1%-';
        expect(() => parse(expression2)).toThrow('Arguments for subtraction not found');
    });
    test('stepByStepOperations', () => {
        const expression = '2-+3';
        expect(() => parse(expression)).toThrow('The subtraction cannot be performed before other operation');
    });
    describe('squareRoot custom checkers', () => {
        test('numOnRightMustBe', () => {
            const expression1 = '2+√';
            expect(() => parse(expression1)).toThrow('The square root operation need an argument on the right');

            const expression2 = '2+√0';
            expect(() => parse(expression2)).not.toThrow('The square root operation need an argument on the right');
        });
        test('exprOnLeftMustNotBeNum', () => {
            const expression = '0√4';
            expect(() => parse(expression)).toThrow('The square root operation mustn\'t has any number on the left');
        });
    });
    describe('percent custom checkers', () => {
        test('numOnRightMustNotBe', () => {
            const expression = '10%0';
            expect(() => parse(expression)).toThrow('The percent operation mustn\'t has a number on the right');
        });
    });
    describe('division custom checkers', () => {
        test('divideByZero', () => {
            const expression = '10/0';
            expect(() => parse(expression)).toThrow('You cannot divide by zero');
        });
    });
});
test('huge expression', () => {
    const expression = '-√0+6+4/√4×2+50%-10/2';

    const exprStructure = parse(expression);

    expect(exprStructure).toEqual([
        subtraction, squareRoot, 0, addition,
        6, addition, 4, division, squareRoot,
        4, multiplication, 2, addition, 50, percent,
        subtraction, 10, division, 2,
    ]);
});