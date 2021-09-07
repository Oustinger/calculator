import { CommonOperationInterface } from '../commonOperationClass';
import eight from './numbers/default/eight';
import five from './numbers/default/five';
import four from './numbers/default/four';
import nine from './numbers/default/nine';
import one from './numbers/default/one';
import seven from './numbers/default/seven';
import six from './numbers/default/six';
import three from './numbers/default/three';
import two from './numbers/default/two';
import zero from './numbers/default/zero';
import doubleZero from './numbers/doubleZero';
import comma from './otherInputs/comma';

export interface NumbersInputsInterface {
    [key: string]: CommonOperationInterface;
}

const numbersInputs: NumbersInputsInterface = {
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    doubleZero,
    comma,
};

export default numbersInputs;
