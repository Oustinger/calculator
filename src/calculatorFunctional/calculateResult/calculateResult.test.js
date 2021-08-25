import calculateResult from "./calculateResult";

describe('addition', () => {
    test('common', () => {
        const expression = '5+2';
        const result = calculateResult(expression);
        expect(result).toBe('7');
    });
    test('with zero', () => {
        const expression = '0+2';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
    test('Operation first', () => {
        const expression = '+2';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
    test('Operation last', () => {
        const expression = '2+';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
});
describe('subtraction', () => {
    test('common', () => {
        const expression = '5-2';
        const result = calculateResult(expression);
        expect(result).toBe('3');
    });
    test('with zero', () => {
        const expression = '0-2';
        const result = calculateResult(expression);
        expect(result).toBe('-2');
    });
    test('Operation first', () => {
        const expression = '-2';
        const result = calculateResult(expression);
        expect(result).toBe('-2');
    });
    test('Operation last', () => {
        const expression = '2-';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
});
describe('multiplication', () => {
    test('common', () => {
        const expression = '6×2';
        const result = calculateResult(expression);
        expect(result).toBe('12');
    });
    test('with zero', () => {
        const expression = '0×2';
        const result = calculateResult(expression);
        expect(result).toBe('0');
    });
    test('Operation first', () => {
        const expression = '×2';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
    test('Operation last', () => {
        const expression = '2×';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
});
describe('division', () => {
    test('common', () => {
        const expression = '6/2';
        const result = calculateResult(expression);
        expect(result).toBe('3');
    });
    test('with zero', () => {
        const expression = '0/2';
        const result = calculateResult(expression);
        expect(result).toBe('0');
    });
    test('Operation first', () => {
        const expression = '/2';
        const result = calculateResult(expression);
        expect(result).toBe('0,5');
    });
    test('Operation last', () => {
        const expression = '2/';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
});
describe('percent', () => {
    test('common', () => {
        const expression = '100-15%';
        const result = calculateResult(expression);
        expect(result).toBe('85');
    });
    test('other operation first', () => {
        const expression1 = '-50%';
        const expression2 = '/50%';

        const result1 = calculateResult(expression1);
        const result2 = calculateResult(expression2);

        expect(result1).toBe('-0,5');
        expect(result2).toBe('2');
    });
    test('expression on the right should be calc', () => {
        const expression = '50%-2';
        const result = calculateResult(expression);
        expect(result).toBe('-1,5');
    });
});
describe('squareRoot', () => {
    test('common', () => {
        const expression = '√4';
        const result = calculateResult(expression);
        expect(result).toBe('2');
    });
    test('other operation first', () => {
        const expression1 = '/√4';
        const result1 = calculateResult(expression1);
        expect(result1).toBe('0,5');

        const expression2 = '-√9';
        const result2 = calculateResult(expression2);
        expect(result2).toBe('-3');
    });
});
describe('floats should be calc', () => {
    test('common', () => {
        const expression = '52,36×74,64';

        const result = calculateResult(expression);

        expect(result).toBe('3908,1504');
    });
});
describe('expression with exSymbols should be calc', () => {
    test('common', () => {
        const expression = '2*5';

        const result = calculateResult(expression);

        expect(result).toBe('10');
    });
    test('dot instead of comma', () => {
        const expression = '52.36×74.64';

        const result = calculateResult(expression);

        expect(result).toBe('3908,1504');
    });
});
test('huge expression', () => {
    const expression = '-√0+6+4/√4×2+50%-10/2+((10*5-20%)/(12/6))';

    const result = calculateResult(expression);

    expect(result).toBe('30');
});