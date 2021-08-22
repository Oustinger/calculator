import styles from './Output.module.css';

const Output = ({ expression, inputVal, error, onInputChange }) => {
    return (
        <div className={styles.output}>
            {expression && <div className={styles.expression}>{expression}</div>}
            <input className={styles.input} value={inputVal} onChange={onInputChange} />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default Output;