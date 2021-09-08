import { ICommonOperation } from '../commonOperationClass';
import calculate from './operations/calculate';
import clean from './operations/clean';

export interface IDefaultOperations {
    [defaultOperationName: string]: ICommonOperation;
}

const defaultOperations: IDefaultOperations = { clean, calculate };

export default defaultOperations;
