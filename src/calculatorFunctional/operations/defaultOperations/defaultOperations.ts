
import { CommonOperationInterface } from '../commonOperationClass';
import calculate from './operations/calculate';
import clean from './operations/clean';

interface DefaultOperationsInterface {
    [key: string]: CommonOperationInterface,
}

const defaultOperations: DefaultOperationsInterface = { clean, calculate };

export default defaultOperations;