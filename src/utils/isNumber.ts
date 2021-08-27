const isNumber = (value: any): value is number => (typeof value === 'number' && isFinite(value));

export default isNumber;