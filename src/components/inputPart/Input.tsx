import cn from 'classnames';
import { TFormatOperationWithFunc, TOperationsBlock } from '../App/IApp';
import styles from './Input.module.css';

const Button = ({ symbol, func, isInvert }: TFormatOperationWithFunc) => (
    <div
        data-symbol={symbol}
        className={cn(styles.button, { [styles.invert]: isInvert })}
        onClick={(e) => func(e.currentTarget.dataset.symbol)}
    >
        {symbol}
    </div>
);

const createBtn = (data: TFormatOperationWithFunc) => <Button key={data.symbol} {...data} />;

export type TInput = {
    topLineBlockOpers: TOperationsBlock;
    rightColumnBlockOpers: TOperationsBlock;
    numbersInputsBlockOpers: TOperationsBlock;
};

const Input = ({ topLineBlockOpers, rightColumnBlockOpers, numbersInputsBlockOpers }: TInput) => (
    <div className={styles.input}>
        <div className={styles.topLine}>{topLineBlockOpers.map(createBtn)}</div>
        <div className={styles.rightLine}>{rightColumnBlockOpers.map(createBtn)}</div>
        <div className={styles.numbersInputs}>{numbersInputsBlockOpers.map(createBtn)}</div>
    </div>
);

export default Input;
