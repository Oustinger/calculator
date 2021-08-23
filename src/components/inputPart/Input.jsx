import cn from 'classnames';
import styles from './Input.module.css';

const Button = ({ symbol, onClick, isInvert }) => (
    <div key={symbol}
        data-symbol={symbol}
        className={cn(styles.button, { [styles.invert]: isInvert })}
        onClick={(e) => onClick(e.currentTarget.dataset.symbol)}>
        {symbol}
    </div>
);

const createBtn = (addSymbol, calculate, clean) => (data) => {
    switch (data.funcName) {
        case 'addSymbol':
            return <Button {...data} onClick={addSymbol} />;
        case 'calculate':
            return <Button {...data} onClick={calculate} />;
        case 'clean':
            return <Button {...data} onClick={clean} />;
        default:
            throw new Error('Unknown action creator function name');
    }
};

const Input = ({
    topLineOperations, rightColumnOperations, numbersInputs,
    addSymbol, calculate, clean,
}) => {
    const readyCreateBtn = createBtn(addSymbol, calculate, clean);

    return (
        <div className={styles.input}>
            <div className={styles.topLine}>
                {topLineOperations.map(readyCreateBtn)}
            </div>
            <div className={styles.rightLine}>
                {rightColumnOperations.map(readyCreateBtn)}
            </div>
            <div className={styles.numbersInputs}>
                {numbersInputs.map(readyCreateBtn)}
            </div>
        </div>
    );
};

export default Input;