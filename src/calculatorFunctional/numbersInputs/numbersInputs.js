import isNumber from "../../utils/isNumber";

const numbers = Array.apply(null, Array(10)).map((val, idx) => idx);    // массив цифр [0-9]


const doubleZero = '00';
const decimalSeparators = [',', '.'];


export const isSymbolNumberInput = (symbol) => {
    const reg = /[0-9, \,, \.]/;
    return (isNumber(symbol) || typeof symbol === 'string') && (symbol.length === 1) && reg.test(symbol);
};

export const getNumberInput = (symbol) => (decimalSeparators.includes(symbol) ? '.' : symbol);

const numbersInputs = { numbers, doubleZero, decimalSeparator: decimalSeparators[0] };

export default numbersInputs;