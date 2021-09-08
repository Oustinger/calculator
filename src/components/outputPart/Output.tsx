import styles from './Output.module.css';

export type TOutput = {
    expression: string;
    inputVal: string;
    error: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Output = ({ expression, inputVal, error, onInputChange }: TOutput) => {
    return (
        <div className={styles.output}>
            <div className={styles.expression}>{expression}</div>
            <input className={styles.input} value={inputVal} onChange={onInputChange} />
            <span className={styles.error}>{error}</span>
        </div>
    );
};

export default Output;
