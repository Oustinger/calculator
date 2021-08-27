const arrayHelper = {
    changeItemsOnItem <T> (
        array: T[],
        newItemValue: any,
        leftBorderIndex: number,
        rightBorderIndex: number = leftBorderIndex + 2,
    ): T[] {
        return [
            ...array.slice(0, leftBorderIndex + 1),
            newItemValue,
            ...array.slice(rightBorderIndex),
        ]
    },
};

export default arrayHelper;