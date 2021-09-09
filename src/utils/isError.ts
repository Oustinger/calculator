const isError = (value: any): value is Error => value instanceof Error;

export default isError;
