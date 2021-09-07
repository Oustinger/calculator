import calcReducer, { addSymbol, calculate, clean, setExpression, setInput } from './calcReducer';

const state = {
    input: '22+3',
    expression: null,
    error: 'Some error',
};

test('input should be set', () => {
    const newInputValue = '1+1';
    const action = setInput(newInputValue);

    const newState = calcReducer(state, action);

    expect(newState.input).toBe(newInputValue);
});

test('new symbol should be added', () => {
    const newSymbol = '1';
    const action = addSymbol(newSymbol);

    const newState = calcReducer(state, action);

    expect(newState.input).toBe(`${state.input}${newSymbol}`);
});

test('result should be calculated', () => {
    const action = calculate();

    const newState = calcReducer(state, action);

    expect(newState.input).toBe('25');
    expect(newState.expression).toBe(state.input);
    expect(newState.error).toBe(null);
});

test('input, express and error should be cleaned', () => {
    const action = clean();

    const newState = calcReducer(state, action);

    expect(newState.input).toBe('');
    expect(newState.expression).toBe(null);
    expect(newState.error).toBe(null);
});
