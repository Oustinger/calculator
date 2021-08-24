import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import './App.module.css';
import styles from './App.module.css';
import Input from './components/inputPart/Input';
import Output from './components/outputPart/Output';
import { addSymbol, calculate, clean, setInput, deleteLastSymbol } from './redux/calc/calcReducer';
import {
    getCalcOperations,
    getDefaultOperations,
    getError,
    getExpression, getInput, getNumbersInputs
} from './redux/calc/calcSelectors';
import store from './redux/store';

const setFunctions = (operations, inputFuncs) => (
    Object.entries(operations)
        .reduce((acc, [operationName, operation]) => {
            const func = Object.entries(inputFuncs)
                .find(([funcName]) => funcName === operation.funcName)[1];

            const newOperation = { ...operation, func };

            return { ...acc, [operationName]: newOperation };
        }, {})
);

const getOperationsByBlocks = (defaultOperations, calcOperations, numbersInputs, inputFuncs) => {
    const { clean, calculate } = setFunctions(defaultOperations, inputFuncs);
    const {
        addition, division, multiplication, percent, squareRoot, subtraction,
    } = setFunctions(calcOperations, inputFuncs);
    const {
        zero, one, two, three, four, five, six, seven, eight, nine, doubleZero, comma,
    } = setFunctions(numbersInputs, inputFuncs);

    const topLineBlockOpers = [clean, squareRoot, percent];
    const rightColumnBlockOpers = [division, multiplication, subtraction, addition, calculate];
    const numbersInputsBlockOpers = [seven, eight, nine, four, five, six, three, two, one, doubleZero, zero, comma];

    return [topLineBlockOpers, rightColumnBlockOpers, numbersInputsBlockOpers];
};

const respondOnKeyUp = (key, operations) => (
    Object.values(operations)
        .forEach(operation => (
            (operation.symbol === key || operation.exSymbols.includes(key)) ? operation.func(operation.symbol) : null
        ))
);

const AppComponent = (props) => {
    const [topLineBlockOpers, rightColumnBlockOpers, numbersInputsBlockOpers] = getOperationsByBlocks(
        props.defaultOperations, props.calcOperations, props.numbersInputs, props.inputFuncs
    );

    const appWrapperRef = React.createRef();
    const onEvent = (event) => {
        if (event.key === 'Enter') {
            props.inputFuncs.calculate();
            return;
        }
        if (event.currentTarget !== event.target) {
            event.stopPropagation();
            return;
        }
        if (event.key === 'Backspace') {
            props.inputFuncs.deleteLastSymbol();
            return;
        }

        respondOnKeyUp(event.key, topLineBlockOpers);
        respondOnKeyUp(event.key, rightColumnBlockOpers);
        respondOnKeyUp(event.key, numbersInputsBlockOpers);
    };
    useEffect(() => {
        const appWrapperElement = appWrapperRef.current;
        appWrapperElement.focus();
        appWrapperElement.addEventListener('keyup', onEvent);

        return () => {
            appWrapperElement.removeEventListener('keyup', onEvent);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div ref={appWrapperRef} className={styles.app__wrapper} tabIndex={1}>
            <div className={styles.app}>
                <div className={styles.app__background}>
                    <div className={styles.app__container}>
                        <Output expression={props.expression}
                            inputVal={props.inputVal}
                            error={props.error}
                            onInputChange={(e) => props.setInput(e.currentTarget.value)}
                        />
                        <Input numbersInputsBlockOpers={numbersInputsBlockOpers}
                            topLineBlockOpers={topLineBlockOpers}
                            rightColumnBlockOpers={rightColumnBlockOpers}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    inputVal: getInput(state),
    expression: getExpression(state),
    error: getError(state),
    numbersInputs: getNumbersInputs(state),
    defaultOperations: getDefaultOperations(state),
    calcOperations: getCalcOperations(state),
});
const mapDispatchToProps = (dispatch) => ({
    setInput: (value) => dispatch(setInput(value)),
    inputFuncs: {
        addSymbol: (symbol) => dispatch(addSymbol(symbol)),
        calculate: () => dispatch(calculate()),
        clean: () => dispatch(clean()),
        deleteLastSymbol: () => dispatch(deleteLastSymbol()),
    },
});

const AppComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);

const App = () => (
    <Provider store={store}>
        <AppComponentContainer />
    </Provider>
);

export default App;