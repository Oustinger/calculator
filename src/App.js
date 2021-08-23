import { connect, Provider } from 'react-redux';
import './App.module.css';
import styles from './App.module.css';
import Input from './components/inputPart/Input';
import Output from './components/outputPart/Output';
import { setInput, addSymbol, calculate, clean } from './redux/calc/calcReducer';
import {
    getError,
    getExpression, getInput, getNumbersInputs,
    getRightColumnOperations, getTopLineOperations
} from './redux/calc/calcSelectors';
import store from './redux/store';

const AppComponent = (props) => (
    <div className={styles.app}
        onKeyUp={(event) => event.keyCode === 13 ? props.calculate() : null}
    >
        <div className={styles.app__background}>
            <div className={styles.app__container}>
                <Output expression={props.expression}
                    inputVal={props.inputVal}
                    error={props.error}
                    onInputChange={(e) => props.setInput(e.currentTarget.value)}
                />
                <Input numbersInputs={props.numbersInputs}
                    topLineOperations={props.topLineOperations}
                    rightColumnOperations={props.rightColumnOperations}
                    addSymbol={props.addSymbol}
                    calculate={props.calculate}
                    clean={props.clean}
                />
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    inputVal: getInput(state),
    expression: getExpression(state),
    error: getError(state),
    numbersInputs: getNumbersInputs(state),
    topLineOperations: getTopLineOperations(state),
    rightColumnOperations: getRightColumnOperations(state),
});

const AppComponentContainer = connect(
    mapStateToProps,
    { setInput, addSymbol, calculate, clean }
)(AppComponent);

const App = () => (
    <Provider store={store}>
        <AppComponentContainer />
    </Provider>
);

export default App;