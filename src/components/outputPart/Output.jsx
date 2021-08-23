import styles from './Output.module.css';

const Output = ({ expression, inputVal, error, onInputChange }) => {
    return (
        <div className={styles.output}>
            <div className={styles.expression}>{expression}</div>
            <input className={styles.input} value={inputVal} onChange={onInputChange} autoFocus={true} />
            <span className={styles.error}>{error}</span>
        </div>
    );
};

export default Output;