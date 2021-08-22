export default (value) => {
    const newLocal = typeof value === 'number' && isFinite(value);
    return newLocal;
}