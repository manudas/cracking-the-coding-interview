export class Stack {
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