import CalcOperationClass from './calcOperationClass';

const isCalcOperationInstance = (object: any): object is CalcOperationClass => object instanceof CalcOperationClass;

export default isCalcOperationInstance;
