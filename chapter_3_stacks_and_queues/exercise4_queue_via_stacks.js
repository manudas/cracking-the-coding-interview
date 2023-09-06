/*
 * Statement
 *
 * Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.
 *
 */

class Stack {
    storage = [];
    stackSize = 0;

    push = (element) => {
        this.storage[this.stackSize] = element;
        this.stackSize++;
    }

    peek = () => {
        if (this.isEmpty()) {
            throw new Error('Empty stack exception');
        }

        return this.storage[this.stackSize - 1];
    }

    pop = () => {
        const element = this.peek();
        this.stackSize--;
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
}


class MyQueue {
    constructor() {
        this.stack = new Stack();
        this.reversedStack = new Stack();
    }

    enqueue = (element) => {
        this.stack.push(element);
    }

    dequeue = () => {
        if (this.reversedStack.isEmpty()) {
            this.reverseMainStack();
        }

        return this.reversedStack.pop();
    }

    reverseMainStack = () => {
        while(!this.stack.isEmpty()) {
            this.reversedStack.push(this.stack.pop());
        }
    }

    isEmpty = () => {
        return this.reversedStack.isEmpty() && this.stack.isEmpty();
    }

    peek = () => {
        if (this.reversedStack.isEmpty()) {
            this.reverseMainStack();
        }

        return this.reversedStack.peek();
    }

    toString = () => {
        const queue = this.reversedStack.storage.slice(0, this.reversedStack.stackSize).reverse().concat(this.stack.storage.slice(0, this.stack.stackSize));
        return queue.toString();
    }
}


// test bench
const data = [
    // queued elementes, dequeue X elements and expected result, queue again, final result
    [[1,2,3,4,5,6],[3, [4,5,6]], [[1,2,3], [4,5,6,1,2,3]]]
];


data.forEach((row) => {
    const [queuedElements, dequeueProcess, secondQueueProcess] = row;
    const queue = new MyQueue();
    queuedElements.forEach((newElement) => {
        queue.enqueue(newElement);
    });


    let [dequeueCounter, dequeueResult] = dequeueProcess;

    while (dequeueCounter) {
        queue.dequeue();
        dequeueCounter--;
    }

    if (dequeueResult.toString() !== queue.toString()) {
        console.error(`Error in queue ${queue.toString()} in first queuing. Expected queue was ${dequeueResult.toString()}, found: ${queue.toString()}`);
    }

    const [secondQueueElements, secondQueueResult] = secondQueueProcess;

    secondQueueElements.forEach(element => {
        queue.enqueue(element);
    });

    if (secondQueueResult.toString() !== queue.toString()) {
        console.error(`Error in queue ${queue.toString()} in final queuing. Expected queue was ${secondQueueResult.toString()}, found: ${queue.toString()}`);
    }
});
