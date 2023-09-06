/*
 * Statement
 *
 * Stack Min: How would you design a stack which, in addition to push and pop, has a function min
 * which returns the minimum element? Push, pop and min should all operate in 0(1) time.
 *
 */

class Stack {
    storage = [];
    minStorage = [Number.MAX_SAFE_INTEGER];

    push = (element) => {
        if (element <= this.minStorage[this.minStorage.length - 1]) {
            this.minStorage.push(element);
        }
        this.storage.push(element);
    }

    pop = () => {
        const element = this.storage.pop();
        if (element === this.minStorage[this.minStorage.length - 1]) {
            this.minStorage.pop();
        }

        return element;
    }

    min = () => {
        return this.minStorage[this.minStorage.length - 1];
    }

    toString = () => {
        return `Stack: ${this.storage.toString()}, min: ${this.minStorage.toString()}`;
    }
}


// test bench
const data = [
    // element, min expected element
    [[3,3], [2,2], [1,1], [3,1], [4,1], [5,1], [6,1], [1,1]]
];

data.forEach((row) => {
    const stack = new Stack();
    row.forEach(([newElement, expectedMin]) => {
        stack.push(newElement);
        if (expectedMin !== stack.min()) {
            console.error(`Error in stack min ${stack.toString()} while pushing. Expected min was ${expectedMin}, min found: ${stack.min()}`);
        }
    });

    for (let i = row.length - 1; i >= 0; i--) {
        const [_, expectedMin] = row[i];
        if (expectedMin !== stack.min()) {
            console.error(`Error in stack min ${stack.toString()} while poping. Expected min was ${expectedMin}, min found: ${stack.min()}`);
        }
        stack.pop();
    }
});

