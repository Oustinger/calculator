const arrayHelper = {
    changeItemsOnItem(array, newItemValue, leftBorderIndex, rightBorderIndex = leftBorderIndex + 2) {
        return [
            ...array.slice(0, leftBorderIndex + 1),
            newItemValue,
            ...array.slice(rightBorderIndex),
        ]
    },
};

export default arrayHelper;