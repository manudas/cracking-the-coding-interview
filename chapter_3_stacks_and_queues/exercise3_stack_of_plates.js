/*
 * Statement
 *
 * Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
 * Therefore, in real life, we would likely start a new stack when the previous stack exceeds some
 * threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be
 * composed of several stacks and should create a new stack once the previous one exceeds capacity.
 * SetOfStacks. push () and SetOfStacks. pop() should behave identically to a single stack
 * (that is, pop ( ) should return the same values as it would if there were just a single stack).
 *
 * FOLLOW UP
 *
 * Implement a function popAt (int index) which performs a pop operation on a specific substack
 * stack.
 *
 */

class Stack {
    storage = null;
    size = 0;
    stackSize = 0;

    constructor(size) {
        this.size = size;
        this.storage = Array(size); // fixed size
    }

    push = (element) => {
        if (this.isFull()) {
            throw new Error('Stack out of bounds exception');
        }
        this.storage[this.stackSize] = element;
        this.stackSize++;
    }

    pop = () => {
        if (this.isEmpty()) {
            throw new Error('Empty stack exception');
        }
        this.stackSize--;
        return this.storage[this.stackSize];
    }

    shift = () => { // pop at the bottom of the stack
        if (this.isEmpty()) {
            throw new Error('Empty stack exception');
        }
        this.stackSize--;

        const [element, ...arr] = this.storage;
        this.storage = arr;

        return element;
    }

    toString = () => `Stack: [${this.storage.reduce((previous, current, currentIndex) =>
            currentIndex < this.stackSize ?
                (
                    `${previous}${currentIndex !== 0
                        ? ','
                        : ''}${current.toString()}`
                )
                : previous
            , '')}]`;

    isEmpty = () => {
        return this.stackSize === 0;
    }

    isFull = () => {
        return this.stackSize === this.size;
    }
}


class SetOfStacks {
    stackList = [];
    constructor(stackSize) {
        this.stackSize = stackSize;
        const stack = new Stack(this.stackSize);
        this.stackList.push(stack);
    }

    push = (element) => {
        let stack = this.stackList[this.stackList.length - 1];
        if (stack.isFull()) {
            stack = new Stack(this.stackSize);
            this.stackList.push(stack);
        }
        stack.push(element);
    }

    pop = () => {
        if (this.isEmpty()) {
            throw new Error('Empty set of stacks exception');
        }
        const element = this.stackList[this.stackList.length - 1].pop();

        if(this.stackList[this.stackList.length - 1].isEmpty()) {
            this.stackList.pop();
        }

        return element;
    }

    popAt = (stackNumber) => {
        if (!this.stackList[stackNumber]) {
            throw new Error('Stack list out of bounds exception');
        }
        return this.shift(stackNumber, true);
    }

    shift = (stackNumber, returnTop) => {
        const element = returnTop ? this.stackList[stackNumber].pop() : this.stackList[stackNumber].shift();

        if (this.stackList[stackNumber].isEmpty()) {
            // only the last stack in the list can be Empty
            this.stackList.pop();
        } else if (stackNumber < this.stackList.length - 1) {
            const nextStackElement = this.shift(stackNumber + 1, false);
            this.stackList[stackNumber].push(nextStackElement);
        }

        return element;
    }

    isEmpty = () => {
        return this.stackList.length === 0;
    }

    countStacks = () => {
        return this.stackList.length;
    }

    toString = () => {
        return this.stackList.reduce((previous, stack, index)  => `${previous}${index > 0 ? ' ' : ''}${stack.toString()}`, '');
    }
}


// test bench
const data = [
    // size of substacks, [element, number of expected substacks]
    [1, [[3,1], [2,2], [1,3], [3,4], [4,5], [5,6], [6,7], [1,8]]],
    [1, [[3,1]]]
];


data.forEach((row) => {
    const [stackSize, stackData] = row;
    const stack = new SetOfStacks(stackSize);
    stackData.forEach(([newElement, expectedSubStacks]) => {
        stack.push(newElement);
        if (expectedSubStacks !== stack.countStacks()) {
            console.error(`Error in stack number ${stack.toString()} while pushing. Expected stack number was ${expectedSubStacks}, found: ${stack.countStacks()}`);
        }
    });

    for (let i = stackData.length - 1; i >= 0; i--) {
        const [_, expectedSubStacks] = stackData[i];
        if (expectedSubStacks !== stack.countStacks()) {
            console.error(`Error in stack number ${stack.toString()} while poping. Expected stack number was ${expectedSubStacks}, found: ${stack.countStacks()}`);
        }
        stack.pop();
    }
});



// test bench
const dataPopAt = [
    // size of substacks, [element, number of expected substacks], [popAt index, result of poping At index]
    [2, [3,2,1,3,4,5,6,4], [[0, 'Stack: [3,1] Stack: [3,4] Stack: [5,6] Stack: [4]'], [1, 'Stack: [3,1] Stack: [3,5] Stack: [6,4]'], [2, 'Stack: [3,1] Stack: [3,5] Stack: [6]']]],
    // [2, [3,2,1,3,4,5,4], [[3, 'Stack: [3,1] Stack: [3,4] Stack: [5,6] Stack: [4]']]],
];

dataPopAt.forEach((row) => {
    const [stackSize, stackData, popAtArr] = row;
    const stack = new SetOfStacks(stackSize);
    stackData.forEach((newElement) => {
        stack.push(newElement);
    });


    popAtArr.forEach(([index, expectedResult]) => {
        stack.popAt(index);
        if (expectedResult !== stack.toString()) {
            console.error(`Error in set of stack ${stack.toString()} while poping at index ${index}. Expected set of stack shape was ${expectedResult}, found: ${stack.toString()}`);
        }
    });
});