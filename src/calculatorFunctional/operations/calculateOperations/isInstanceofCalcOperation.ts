import CalcOperationClass from './calcOperationClass';

const isInstanceofCalcOperation = (object: any): object is CalcOperationClass => object instanceof CalcOperationClass;

export default isInstanceofCalcOperation;
