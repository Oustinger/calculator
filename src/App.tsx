import React, { createRef, useEffect } from 'react';
import { connect, Provider, RootStateOrAny } from 'react-redux';
import './App.module.css';
import styles from './App.module.css';
import Input from './components/inputPart/Input';
import Output, { TOutput } from './components/outputPart/Output';
import {
    addSymbol,
    TCalcReducerPayloadAction,
    calculate,
    clean,
    deleteLastSymbol,
    setInput,
} from './redux/calc/calcReducer';
import {
    getCalcOperations,
    getDefaultOperations,
    getError,
    getExpression,
    getInput,
    getNumbersInputs,
    getParenthesesOperations,
    IFormatOperations,
    TFormatOperation,
} from './redux/calc/calcSelectors';
import store from './redux/store';

type TFormatOperationWithFunc = TFormatOperation & {
    func: TInputFunc;
};

type IFormatOperationsWithFunc = {
    [operationName: string]: TFormatOperationWithFunc;
};

const setFunctions = (operations: IFormatOperations, inputFuncs: TInputFunctions): IFormatOperationsWithFunc =>
    Object.entries(operations).reduce((acc, [operationName, operation]) => {
        const inputFuncsAsArr = Object.entries(inputFuncs);
        const inputFuncArr = inputFuncsAsArr.find(([funcName]) => funcName === operation.funcName);

        if (!inputFuncArr) {
            throw new Error('Programming error: input function not found in "setFunctions" function');
        }

        const func = inputFuncArr[1];

        const newOperation = { ...operation, func };

        return { ...acc, [operationName]: newOperation };
    }, {});

type TOperationsBlock = TFormatOperationWithFunc[];

const getOperationsByBlocks = (
    defaultOperations: IFormatOperations,
    calcOperations: IFormatOperations,
    numbersInputs: IFormatOperations,
    parenthesesOperations: IFormatOperations,
    inputFuncs: TInputFunctions
): TOperationsBlock[] => {
    const { clean, calculate } = setFunctions(defaultOperations, inputFuncs);
    const { openParenthesis, closeParenthesis } = setFunctions(parenthesesOperations, inputFuncs);
    const { addition, division, multiplication, percent, squareRoot, subtraction } = setFunctions(
        calcOperations,
        inputFuncs
    );
    const { zero, one, two, three, four, five, six, seven, eight, nine, doubleZero, comma } = setFunctions(
        numbersInputs,
        inputFuncs
    );

    const topLineBlockOpers = [clean, squareRoot, percent];
    const rightColumnBlockOpers = [division, multiplication, subtraction, addition, calculate];
    const numbersInputsBlockOpers = [seven, eight, nine, four, five, six, three, two, one, doubleZero, zero, comma];
    const noBlockOpers = [openParenthesis, closeParenthesis];

    return [topLineBlockOpers, rightColumnBlockOpers, numbersInputsBlockOpers, noBlockOpers];
};

const respondOnKeyUp = (key: string, operations: TOperationsBlock) =>
    Object.values(operations).forEach((operation) =>
        operation.symbol === key || operation.exSymbols.includes(key) ? operation.func(operation.symbol) : null
    );

interface IMapStateToProps {
    inputVal: string;
    expression: string;
    error: string;
    numbersInputs: IFormatOperations;
    parenthesesOperations: IFormatOperations;
    defaultOperations: IFormatOperations;
    calcOperations: IFormatOperations;
}

type TInputFunc = (symbol?: string) => {};

type TInputFunctions = {
    addSymbol: TInputFunc;
    calculate: TInputFunc;
    clean: TInputFunc;
    deleteLastSymbol: TInputFunc;
};

interface IMapDispatchToProps {
    setInput: (value: string) => {};
    inputFuncs: TInputFunctions;
}

type AppProps = IMapStateToProps & IMapDispatchToProps;

const AppComponent = (props: AppProps) => {
    const [topLineBlockOpers, rightColumnBlockOpers, numbersInputsBlockOpers, noBlockOpers] = getOperationsByBlocks(
        props.defaultOperations,
        props.calcOperations,
        props.numbersInputs,
        props.parenthesesOperations,
        props.inputFuncs
    );

    const appWrapperRef = createRef<HTMLDivElement>();
    const onEvent = (event: KeyboardEvent): void => {
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
        respondOnKeyUp(event.key, noBlockOpers);
    };
    useEffect(() => {
        const appWrapperElement = appWrapperRef.current;

        if (appWrapperElement === null)
            throw new Error(
                'Programming error: app wrapper ref element is null but expected HTMLDivElement in "AppComponent"'
            );

        appWrapperElement.focus();
        appWrapperElement.addEventListener('keydown', onEvent);

        return () => {
            appWrapperElement.removeEventListener('keydown', onEvent);
        };
        // eslint-disable-next-line
    }, []);

    const OutputProps: TOutput = {
        expression: props.expression,
        inputVal: props.inputVal,
        error: props.error,
        onInputChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
            if (e.currentTarget) props.setInput((e.currentTarget as HTMLInputElement).value);
        },
    };

    return (
        <div ref={appWrapperRef} className={styles.app__wrapper} tabIndex={1}>
            <div className={styles.app}>
                <div className={styles.app__background}>
                    <div className={styles.app__container}>
                        <Output {...OutputProps} />
                        <Input
                            numbersInputsBlockOpers={numbersInputsBlockOpers}
                            topLineBlockOpers={topLineBlockOpers}
                            rightColumnBlockOpers={rightColumnBlockOpers}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootStateOrAny): IMapStateToProps => ({
    inputVal: getInput(state),
    expression: getExpression(state),
    error: getError(state),
    numbersInputs: getNumbersInputs(state),
    parenthesesOperations: getParenthesesOperations(state),
    defaultOperations: getDefaultOperations(state),
    calcOperations: getCalcOperations(state),
});
const mapDispatchToProps = (dispatch: (action: TCalcReducerPayloadAction) => {}): IMapDispatchToProps => ({
    setInput: (value: string) => dispatch(setInput(value)),
    inputFuncs: {
        addSymbol: (symbol: string | undefined) => !!symbol && dispatch(addSymbol(symbol)),
        calculate: () => dispatch(calculate()),
        clean: () => dispatch(clean()),
        deleteLastSymbol: () => dispatch(deleteLastSymbol()),
    },
});

const AppComponentContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

const App = () => (
    <Provider store={store}>
        <AppComponentContainer />
    </Provider>
);

export default App;
