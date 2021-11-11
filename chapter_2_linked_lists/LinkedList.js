class Node {
    constructor(element)
    {
        this.element = element;
        this.next = null
    }
}

/**
 * Implementing LinedList in JS
 * using an underlying array to
 * store it, as is the most
 * performance-efficient way, as
 * in Java with ArrayList
 */
// export class LinkedList { // testing as a local file can't use export / import
class LinkedList {

    static clone(list) {
        const cloned = new LinkedList();
        cloned.list = Array.from(list.list, (node) => {
            const clonedNode = new Node(node.element);
            return clonedNode;
        });
        for (let i = 0; i < cloned.list.length; i++) {
            cloned.list[i].next = cloned.list[i+1] ? cloned.list[i+1] : null;
        }
        cloned.head = cloned.list[0] ? cloned.list[0] : nll;
        cloned.size = list.size;

        return cloned;
    }
    0
    constructor()
    {
        this.list = null;
        this.head = null;
        this.size = 0;
    }

    /**
     * Adds a new element to the list
     * @param {any} element
     */
    add(element)
    {
        // creates a new node
        const node = new Node(element);

        // if list is Empty add the
        // element and make it head
        // if (!element) {
        //     debugger;
        // }
        if (this.head == null) {
            this.list = [node];
            this.head = node;
        } else {
            this.list[this.list.length - 1].next = node
            this.list.push(node);
        }
        this.size++;
    }

    /**
     * Insert element at the given
     * position index of the list
     *
     * @param {any} element
     * @param {Number} index
     */
    insertAt(element, index)
    {
        if (index < 0 || index > this.size) {
            console.log("Please enter a valid index.");
        } else {
            // creates a new node
            const node = new Node(element);

            const previous = this.list[index - 1] ? this.list[index -1] : null; // first element?
            const next = this.list[index + 1] ? this.list[index + 1] : null; // last element?

            if (previous) { // is not the first element
                previous.next = node;
            } else { // first element
                this.head = node;
            }
            if (next) {
                node.next = next;
            }

            // splice(startPoint, deleteCount, addedElement)
            this.list.splice(index, 0, node);

            this.size++;
        }
    }

    /**
     * Removes an element from the
     * list at the specified location
     * @param {Number} index 
     * @returns {any} The removed element
     */
    removeFrom(index)
    {
        if (index < 0 || index >= this.size) {
            console.log("Please Enter a valid index");
        } else {
            const previous = this.list[index - 1] ? this.list[index -1] : null; // first element?
            const next = this.list[index + 1] ? this.list[index + 1] : null; // last element?

            if (previous) previous.next = next; // not the first element
            else this.head = next; // first element

            // splice(startPoint, deleteCount, addedElement)
            const [node] = this.list.splice(index, 1);

            this.size--;

            // return the removed element
            return node.element;
        }
    }

    /**
     * Removes a given element from the list
     * @param {any} element 
     * @returns the removed element, -1 otherwise
     */
    removeElement(element)
    {
        const elementIndex = this.indexOf(element);
        if (elementIndex !== -1) {
            return this.removeFrom(elementIndex);
        } else {
            return -1;
        }
    }

    /**
     * Finds the index position of element in the list
     * @param {any} element
     * @returns the index of the element, -1 if not found
     */
    indexOf(element)
    {
        return this.list.findIndex(node => node.element === element);
    }

    /**
     * Checks wheter or not list is empty
     * @returns true if empty, false otherwise
     */
    isEmpty()
    {
        return this.size === 0;
    }

    /**
     *
     * @returns The size of the list
     */
    getSize() {
        return this.size;
    }

    /**
     * Prints the list
     */
    printList(returnString = false)
    {
        let str = '';
        for (let i = 0; i < this.list.length; i++) {
            str += this.list[i].element + " ";
        }
        if (returnString) {
            return str;
        }
        console.log(str);
    }

    /**
     *
     * @returns the list as an array
     */
    toArray() {
        return this.list;
    }
}