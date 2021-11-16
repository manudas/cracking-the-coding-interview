/**
 * Statement:
 *
 * Partition: Write code to partition a linked list around a value x, such that all nodes less than x come
 * before all nodes greater than or equal to x. If x is contained within the list, the values of x only need
 * to be after the elements less than x (see below). The partition element x can appear anywhere in the
 * "right partition"; it does not need to appear between the left and right partitions.
 *
 * EXAMPLE
 * Input:  3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition = 5]
 * Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
 *
 */

/* Pass in the head of the linked list and the value to partition around */
const example_partition = (node, x) => {
    beforeStart = null;
    beforeEnd = null;
    afterStart = null;
    afterEnd = null;
    /* Partition list */
    while (node != null) {
        next = node.next;
        node.next = null;
        if (node.element < x) {
            /* Insert node into end of before list */
            if (beforeStart == null) {
                beforeStart = node;
                beforeEnd = beforeStart;
            } else {
                beforeEnd.next = node;
                beforeEnd = node;
            }
        } else {
            /* Insert node into end of after list */
            if (afterStart == null) {
                afterStart = node;
                afterEnd = afterStart;
            } else {
                afterEnd.next = node;
                afterEnd = node;
            }
        }
        node = next;
    }
    if (beforeStart == null) {
        return afterStart;
    }
    /* Merge before list and after list */
    beforeEnd.next = afterStart;
    return beforeStart;
}


const partition = (headNode, partitionElement) => {
    let head = headNode;
    let tail = head;

    let runner = head.next;
    while (runner != null) {
        const next = runner.next;
        if (runner.element >= partitionElement) { // goes to tail
            tail.next = runner;
            tail = tail.next;
            tail.next = null;
        } else { // goes to head
            runner.next = head;
            head = runner;
        }
        runner = next;
    }

    return head;
}



const arr = [3, 5, 8, 5, 10, 2, 1];
list = new LinkedList();
for(let i = 0; i < arr.length; i++) {
    list.add(arr[i]);
}

const clonedList = LinkedList.clone(list);
const result = partition(clonedList.head, 5);
clonedList.head = result;
clonedList.syncInternalStorage();

console.log(`Original list is ${list.printList(true)} and partitioned list is ${clonedList.printList(true)}`);
