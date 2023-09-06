export class Node<T> {
    public element: T
    public next: Node<T> | null
    constructor(element: T)
    {
        this.element = element;
        this.next = null
    }
}

/**
 * Implementing LinedList in TS
 * using an underlying array to
 * store it, as is the most
 * performance-efficient way, as
 * in Java with ArrayList
 */
export class LinkedList<T> {

    static clone(list) {
        const cloned = new LinkedList();
        cloned.list = Array.from(list.list, (node: Node<unknown>) => {
            const clonedNode = new Node(node.element);
            return clonedNode;
        });
        for (let i = 0; i < cloned.list.length; i++) {
            cloned.list[i].next = cloned.list[i+1] ? cloned.list[i+1] : null;
        }
        cloned.head = cloned.list[0] ? cloned.list[0] : null;
        cloned.size = list.size;

        return cloned;
    }

    static fromArray(arr = []) {
        const list = new LinkedList();
        for (let i = 0; i < arr.length; i++) {
            list.add(arr[i]);
        }
        return list;
    }

    list: Array<Node<T>> | null
    head: Node<T> | null
    size: number

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
    add(element: Node<T> | T)
    {
        // creates a new node
        const node = !(element instanceof Node) ? new Node(element) : element;

        // if list is Empty add the
        // element and make it head
        if (this.head == null) {
            this.list = [node];
            this.head = node;
        } else {
            this.list![this.list!.length - 1].next = node
            this.list!.push(node);
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
    insertAt(element: Node<T> | T, index: number)
    {
        if (index < 0 || index > this.size) {
            console.log("Please enter a valid index.");
        } else {
            // creates a new node
            const node = !(element instanceof Node) ? new Node(element) : element;

            const previous = this.list![index - 1] ? this.list![index -1] : null; // first element?
            const next = this.list![index + 1] ? this.list![index + 1] : null; // last element?

            if (previous) { // is not the first element
                previous.next = node;
            } else { // first element
                this.head = node;
            }
            if (next) {
                node.next = next;
            }

            // splice(startPoint, deleteCount, addedElement)
            this.list!.splice(index, 0, node);

            this.size++;
        }
    }

    /**
     * Removes an element from the
     * list at the specified location
     * @param {Number} index
     * @returns {any} The removed element
     */
    removeFrom(index: number)
    {
        if (index < 0 || index >= this.size) {
            console.log("Please Enter a valid index");
        } else {
            const previous = this.list![index - 1] ? this.list![index -1] : null; // first element?
            const next = this.list![index + 1] ? this.list![index + 1] : null; // last element?

            if (previous) previous.next = next; // not the first element
            else this.head = next; // first element

            // splice(startPoint, deleteCount, addedElement)
            const [node] = this.list!.splice(index, 1);

            this.size--;

            // return the removed element
            return node.element;
        }
    }

    /**
     * Removes and returns the first element in the list
     * @returns the first element in the linked list
     */
    poll() {
        if (this.isEmpty()) return null;
        else return this.removeFrom(0);
    }

    /**
     * Returns the first element in the list
     * @returns the first element in the linked list
     */
    peek() {
        return this.head?.element
    }

    /**
     * Removes a given element from the list
     * @param {any} element
     * @returns the removed element, -1 otherwise
     */
    removeElement(element: T)
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
    indexOf(element: T)
    {
        return this.list?.findIndex(node => node.element === element) ?? -1;
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
        let str = '[';
        for (let i = 0; i < this.size; i++) {
            str += this.list![i].element + " ";
        }
        str = str.trim();
        str += ']';
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

    syncInternalStorage() {
        let node = this.head;
        let index = 0;
        while (node !== null) {
            this.list![index] = node;
            node = node.next;
            index++;
        }
        this.list!.length = index;
    }
}