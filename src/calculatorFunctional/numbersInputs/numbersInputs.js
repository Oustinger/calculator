import isNumber from "../../utils/isNumber";

const numbers = Array.apply(null, Array(10)).map((val, idx) => idx + 1);    // массив цифр [0-9]


const doubleZero = '00';
const decimalSeparator = ',';


export const isSymbolNumberInput = (symbol) => {
    const reg = /[0-9, \,]/;
    return (isNumber(symbol) || typeof symbol === 'string') && (symbol.length === 1) && reg.test(symbol);
};

export const getNumberInput = (symbol) => (symbol === decimalSeparator ? '.' : symbol);

const numbersInputs = { numbers, doubleZero, decimalSeparator };

export default numbersInputs;