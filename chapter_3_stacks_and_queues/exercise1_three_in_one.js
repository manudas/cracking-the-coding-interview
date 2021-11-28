/*
 * Statement:
 *
 * Three in One: Describe how you could use a single array to implement three stacks.
 */

class FixedMultiStack {
    constructor(sizeByStack, stackNumber) {
        this.stackNumber = stackNumber;
        this.sizeByStack = sizeByStack;
        this.stackValues = Array(sizeByStack * stackNumber);
        // initial stack size without elements
        this.stackSizes = Array(stackNumber).fill(0);
    }

    isFull = (stackNumber) => {
        return this.stackSizes[stackNumber] === this.sizeByStack;
    }

    isEmpty = (stackNumber) => {
        return this.stackSizes[stackNumber] === 0;
    }

    push = (stackNumber, element) => {
        if (this.isFull(stackNumber)) {
            throw new Error('Stack out of bounds exception');
        }

        this.stackValues[stackNumber * this.sizeByStack + this.size(stackNumber)] = element;
        this.stackSizes[stackNumber]++;
    }

    peak(stackNumber) {
        if (this.isEmpty(stackNumber)) {
            throw new Error('Empty stack exception');
        }

        return this.stackValues[stackNumber * this.stackSizes + this.size(stackNumber)];
    }

    pop = (stackNumber) => {
        if (this.isEmpty(stackNumber)) {
            throw new Error('Empty stack exception');
        }
        const value = this.peak(stackNumber);
        this.stackSizes[stackNumber]--;

        return value;
    }

    size = (stackNumber) => {
        return this.stackSizes[stackNumber];
    }

    toString = () => {
        let str = '';
        for (let i = 0; i < this.stackSizes.length; i++) {
            str += '[';
            let size = this.size(i);

            let indexElement = 0;
            while (indexElement < size) {
                const element = this.stackValues[i * size + indexElement];

                str += element;
                if (indexElement + 1 < size) {
                    str += ',';
                }
                indexElement ++;
            }
            str += ']';
            if (i + 1 < this.stackSizes.length) {
                str += ',';
            }
        }
        return str;
    }
}

class DynamicMultiStack {
    constructor(sizeByStack, stackNumber) {
        this.stackNumber = stackNumber;
        this.sizeByStack = Array(stackNumber).fill(sizeByStack);
        this.stackValues = Array(sizeByStack * stackNumber);
        // initial stack size without elements
        this.stackSizes = Array(stackNumber).fill(0);

        this.stackIndexes = Array(stackNumber).fill(null);
        this.stackIndexes.forEach((_, index) => {
            this.stackIndexes[index] = sizeByStack * index;
        });
    }

    isFull = (stackNumber) => {
        return this.stackSizes[stackNumber] === this.sizeByStack[stackNumber];
    }

    allAreFull = () => {
        const total = this.stackSizes.reduce((s, c) => s + c, 0);
        return total === this.stackValues.length;
    }

    getTopIndex = (stackNumber) => {
        return (this.getBottomIndex(stackNumber) + this.size(stackNumber)) % this.stackValues.length;
    }
    getBottomIndex = (stackNumber) => this.stackIndexes[stackNumber];

    isEmpty = (stackNumber) => {
        return this.stackSizes[stackNumber] === 0;
    }

    push = (stackNumber, element) => {
        if (this.isFull(stackNumber) && this.allAreFull()) {
            throw new Error('Stack out of bounds exception');
        }

        if (this.isFull(stackNumber)) {
            this.shift(stackNumber);
        }

        this.stackValues[this.getTopIndex(stackNumber)] = element;
        this.stackSizes[stackNumber]++;
    }

    peak(stackNumber) {
        if (this.isEmpty(stackNumber)) {
            throw new Error('Empty stack exception');
        }

        return this.stackValues[this.getTopIndex(stackNumber)];
    }

    pop = (stackNumber) => {
        if (this.isEmpty(stackNumber)) {
            throw new Error('Empty stack exception');
        }
        const value = this.peak(stackNumber);
        this.stackSizes[stackNumber]--;

        return value;
    }

    size = (stackNumber) => {
        return this.stackSizes[stackNumber];
    }

    shift = (stackNumber) => {
        let stackToShrink = (stackNumber + 1) % this.stackSizes.length;
        let counter = 1;
        while (this.isFull(stackToShrink) && stackToShrink !== stackNumber) {
            stackToShrink = ++stackToShrink % this.stackSizes.length;
            counter++;
        }
        while (counter !== 0) {
            this.shrink(stackToShrink);
            stackToShrink = --stackToShrink % this.stackValues.length;
            counter--;
        }
        this.expand(stackNumber);
    }

    expand = (stackNumber) => {
        this.sizeByStack[stackNumber]++;
    }

    shrink = (stackNumber) => {
        // const topIndex = this.getTopIndex(stackNumber);
        let runnerIndex = this.getTopIndex(stackNumber);

        const stackSize = this.size(stackNumber);
        // for(let i = stackSize; i >= 0; i--) {
        for(let i = 0; i < stackSize; i++) {
        // while (runnerIndex < topIndex + 1) {
            const realRunnerIndex = (runnerIndex - i) % this.stackValues.length; // circular array storage
            this.stackValues[realRunnerIndex] = this.stackValues[realRunnerIndex - 1];
        }

        // update bottom index
        this.stackIndexes[stackNumber] = ++this.stackIndexes[stackNumber] % this.stackValues.length;
        // new size of the stack = old size - 1
        this.sizeByStack[stackNumber]--;
    }

    toString = () => {
        let str = '';
        for (let i = 0; i < this.stackIndexes.length; i++) {
            str += '[';
            let counter = this.size(i);
            const bottom = this.getBottomIndex(i);
            let indexElement = 0;
            while (indexElement < counter) {
                const element = this.stackValues[(bottom + indexElement) % this.stackValues.length];
                str += element;
                if (indexElement + 1 < counter) {
                    str += ',';
                }
                indexElement++;
                // counter --;
            }
            str += ']';
            if (i + 1 < this.stackIndexes.length) {
                str += ',';
            }
        }
        return str;
    }
}


// test bench
const data = [
    // number of stack elements, size of stack, array of elements of each stack, expected result with fixed size, expected result with dynamic size
    // result false: failure, true: success
    [3, 1, [[1, 2, 3, 4, 5, 6], [], []], false, false],
    [3, 6, [[1, 2, 3, 4, 5, 6], [], []], true, true],
    [3, 3, [[1, 2, 3, 4, 5, 6], [], []], false, true],
    [3, 2, [[1, 2], [3], [4, 5, 6]], false, true],
];

data.forEach((stackBenchData) => {
    const [
        numberOfStacks,
        sizeByStack,
        stackArr,
        resultFixedSize,
        resultDynamicSize,
    ] = stackBenchData;

    const expectedRepresentation = stackArr.map(arr => `[${arr.toString()}]`).toString();

    let successFixed = successDynamic = true;
    const fixedMultistack = new FixedMultiStack(sizeByStack, numberOfStacks);
    try {
        const maxLength = Math.max(...stackArr.map(a => a.length));
        for (let size = 0; size < maxLength; size++) {
            for (let stackIndex = 0; stackIndex < stackArr.length; stackIndex++) {
                const dataUnit = stackArr[stackIndex][size] ? stackArr[stackIndex][size] : null;
                if (dataUnit) {
                    fixedMultistack.push(stackIndex, dataUnit);
                }
            }
        }

    } catch (e) {
        console.error(e);
        successFixed = false;
    }

    if (successFixed !== resultFixedSize) {
        console.error(`Different result expected for FIXED stack ${stackArr.map(arr => `[${arr.toString()}]`)}, expected ${resultFixedSize ? 'success' : 'failure'}, got ${successFixed ? 'success' : 'failure'}`);
    }

    if (successFixed && expectedRepresentation !== fixedMultistack.toString()) {
        console.error(`WARNING: Different representation for FIXED stack found. Expected: ${expectedRepresentation}, found  ${fixedMultistack.toString()}`);
    }

    const dynamicMultistack = new DynamicMultiStack(sizeByStack, numberOfStacks);
    try {
        const maxLength = Math.max(...stackArr.map(a => a.length));
        for (let size = 0; size < maxLength; size++) {
            for (let stackIndex = 0; stackIndex < stackArr.length; stackIndex++) {
                const dataUnit = stackArr[stackIndex][size] ? stackArr[stackIndex][size] : null;
                if (dataUnit) {
                    dynamicMultistack.push(stackIndex, dataUnit);
                }
            }
        }

    } catch (e) {
        console.error(e);
        successDynamic = false;
    }

    if (successDynamic !== resultDynamicSize) {
        console.error(`Different result expected for DYNAMIC stack ${expectedRepresentation}, expected ${resultDynamicSize ? 'success' : 'failure'}, got ${successDynamic ? 'success' : 'failure'}`);
    }

    if (successDynamic && expectedRepresentation !== dynamicMultistack.toString()) {
        console.error(`WARNING: Different representation for DYNAMIC stack found. Expected: ${expectedRepresentation}, found  ${dynamicMultistack.toString()}`);
    }
});
