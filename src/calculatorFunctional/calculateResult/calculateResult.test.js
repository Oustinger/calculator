import addition from "../calculateOperations/operations/addition";
import division from "../calculateOperations/operations/division";
import multiplication from './../calculateOperations/operations/multiplication';
import percent from './../calculateOperations/operations/percent';
import squareRoot from './../calculateOperations/operations/squareRoot';
import subtraction from './../calculateOperations/operations/subtraction';
import calculateResult, { parse } from "./calculateResult";

describe('parsing', () => {
    describe('operations parse checkers', () => {
        test('argumentsNotFound', () => {
            const expression1 = '-';
            expect(() => parse(expression1)).toThrow('Arguments not found');

            const expression2 = '1%-';
            expect(() => parse(expression2)).toThrow('Arguments not found');
        });
        test('stepByStepOperations', () => {
            const expression = '2-+3';
            expect(() => parse(expression)).toThrow('There are operations that cannot be performed step by step');
        });
        describe('squareRoot custom checkers', () => {
            test('rightNumMustBe', () => {
                const expression1 = '2+√';
                expect(() => parse(expression1)).toThrow('The square root operation need an argument on the right');

                const expression2 = '2+√0';
                expect(() => parse(expression2)).not.toThrow('The square root operation need an argument on the right');
            });
            test('leftExprMustNotBeNum', () => {
                const expression = '0√4';
                expect(() => parse(expression)).toThrow('The square root operation mustn\'t has any number on the right');
            });
        });
        describe('percent custom checkers', () => {
            test('rightNumMustNotBe', () => {
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
        const expression = '-√0+6+4/√4∗2+50%-10/2';

        const exprStructure = parse(expression);

        expect(exprStructure).toEqual([
            subtraction, squareRoot, 0, addition,
            6, addition, 4, division, squareRoot,
            4, multiplication, 2, addition, 50, percent,
            subtraction, 10, division, 2,
        ]);
    });
});

describe('calculateResult', () => {
    describe('addition', () => {
        test('common', () => {
            const expression = '5+2';
            const result = calculateResult(expression);
            expect(result).toBe(7);
        });
        test('Operation first', () => {
            const expression = '+2';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
        test('Operation last', () => {
            const expression = '2+';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
    });
    describe('subtraction', () => {
        test('common', () => {
            const expression = '5-2';
            const result = calculateResult(expression);
            expect(result).toBe(3);
        });
        test('Operation first', () => {
            const expression = '-2';
            const result = calculateResult(expression);
            expect(result).toBe(-2);
        });
        test('Operation last', () => {
            const expression = '2-';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
    });
    describe('multiplication', () => {
        test('common', () => {
            const expression = '6∗2';
            const result = calculateResult(expression);
            expect(result).toBe(12);
        });
        test('Operation first', () => {
            const expression = '∗2';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
        test('Operation last', () => {
            const expression = '2∗';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
    });
    describe('division', () => {
        test('common', () => {
            const expression = '6/2';
            const result = calculateResult(expression);
            expect(result).toBe(3);
        });
        test('Operation first', () => {
            const expression = '/2';
            const result = calculateResult(expression);
            expect(result).toBe(0.5);
        });
        test('Operation last', () => {
            const expression = '2/';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
    });
    describe('percent', () => {
        test('common', () => {
            const expression = '100-15%';
            const result = calculateResult(expression);
            expect(result).toBe(85);
        });
        test('other operation first', () => {
            const expression1 = '-50%';
            const expression2 = '/50%';

            const result1 = calculateResult(expression1);
            const result2 = calculateResult(expression2);

            expect(result1).toBe(-0.5);
            expect(result2).toBe(2);
        });
        test('expression on the right should be calc', () => {
            const expression = '50%-2';
            const result = calculateResult(expression);
            expect(result).toBe(-1.5);
        });
    });
    describe('squareRoot', () => {
        test('common', () => {
            const expression = '√4';
            const result = calculateResult(expression);
            expect(result).toBe(2);
        });
        test('other operation first', () => {
            const expression1 = '/√4';
            const result1 = calculateResult(expression1);
            expect(result1).toBe(0.5);

            const expression2 = '-√9';
            const result2 = calculateResult(expression2);
            expect(result2).toBe(-3);
        });
    });
    test('huge expression', () => {
        const expression = '-√0+6+4/√4∗2+50%-10/2';

        const result = calculateResult(expression);

        expect(result).toBe(10);
    });
});