import cn from 'classnames';
import { connect, Provider } from 'react-redux';
import './App.module.css';
import styles from './App.module.css';
import { addSymbol, calculate, clean, setExpression, setInput } from './redux/calc/calcReducer';
import {
    getExpression, getInput, getNumbersInputs,
    getRightColumnOperations, getTopLineOperations
} from './redux/calc/calcSelectors';
import store from './redux/store';

const AppComponent = (props) => (
    <div className={cn(styles.app, 'grid-items-center')}>
        <div className={styles.app__background}>
            <div className={styles.app__container}>
                123123123
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    inputVal: getInput(state),
    expression: getExpression(state),
    numbersInputs: getNumbersInputs(state),
    topLineOperations: getTopLineOperations(state),
    rightColumnOperations: getRightColumnOperations(state),
});

const AppComponentContainer = connect(
    mapStateToProps,
    { setInput, setExpression, addSymbol, calculate, clean }
)(AppComponent);

const App = () => (
    <Provider store={store}>
        <AppComponentContainer />
    </Provider>
);

export default App;