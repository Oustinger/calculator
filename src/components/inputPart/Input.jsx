import cn from 'classnames';
import styles from './Input.module.css';

const Button = ({ symbol, func, isInvert }) => (
    <div
        data-symbol={symbol}
        className={cn(styles.button, { [styles.invert]: isInvert })}
        onClick={(e) => func(e.currentTarget.dataset.symbol)}
    >
        {symbol}
    </div>
);

const createBtn = (data) => <Button key={data.symbol} {...data} />;

const Input = ({ topLineBlockOpers, rightColumnBlockOpers, numbersInputsBlockOpers }) => (
    <div className={styles.input}>
        <div className={styles.topLine}>{topLineBlockOpers.map(createBtn)}</div>
        <div className={styles.rightLine}>{rightColumnBlockOpers.map(createBtn)}</div>
        <div className={styles.numbersInputs}>{numbersInputsBlockOpers.map(createBtn)}</div>
    </div>
);

export default Input;
