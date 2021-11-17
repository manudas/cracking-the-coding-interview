/**
 * Statement:
 *
 * Sum Lists: You have two numbers represented by a linked list, where each node contains a single
 * digit. The digits are stored in reverse order, such that the 1 's digit is at the head of the list. Write a
 * function that adds the two numbers and returns the sum as a linked list.
 *
 * EXAMPLE
 * Input: (7-> 1 -> 6) + (5 -> 9 -> 2) .That is, 617 + 295.
 * Output: 2 - > 1 - > 9. That is, 912.
 *
 * FOLLOW UP
 * Suppose the digits are stored in forward order. Repeat the above problem.
 * Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).That is, 617 + 295.
 * Output: 9 - > 1 - > 2. That is, 912 .
 *
 */

/* Pass in the head of the linked list around */
const reverseListToNumberRecursive = (node, arr) => { // Space O(1) at a the same time, Time O(n)

    if (node.next === null) {
        arr.push(node.element);
        return;
    }

    reverseListToNumberRecursive(node.next, arr);

    arr.push(node.element);
}

const reverseListToNumber = node => {
    const numbArr = [];
    reverseListToNumberRecursive(node, numbArr);
    return Number(numbArr.join(''));
}

const listToNumber = node => {
    const numbArr = [];
    let runner = node;
    while (runner != null) {
        numbArr.push(runner.element);
        runner = runner.next;
    }
    return Number(numbArr.join(''));
}

const sumLists = (listA, listB, areReversed = true) => {
    const numbA = areReversed ? reverseListToNumber(listA.head) : listToNumber(listA.head); // O(a)
    const numbB = areReversed ? reverseListToNumber(listB.head) : listToNumber(listB.head); // O(b)
    const result = numbA + numbB; // O(1)
    const resultArr = String(result).split('').map(Number); // O( (a+b)^2 ) FOREACH number, we run Number, so n^2

    const resultLinkedList = new LinkedList();
    let index = areReversed ? resultArr.length - 1 : 0;
    let limit = areReversed ? 0 : resultArr.length - 1;
    for(; areReversed ? index >= limit : index <= limit; areReversed ? index-- : index++) {
        resultLinkedList.add(resultArr[index]);
    }

    return resultLinkedList;
}


const arr1_reverse = [7, 1, 6];
const arr2_reverse = [5, 9, 2];
const length_reverse = Math.max(arr1_reverse.length, arr2_reverse.length);
const reverselist1 = new LinkedList();
const reverselist2 = new LinkedList();
for(let i = 0; i < length_reverse; i++) {
    arr1_reverse[i] && reverselist1.add(arr1_reverse[i]);
    arr2_reverse[i] && reverselist2.add(arr2_reverse[i]);
}
let areReversed = true;
const reversedResultList = sumLists(reverselist1, reverselist2, areReversed);

console.log(`Sum of reversed listA ${reverselist1.printList(true)} and reversed listB ${reverselist2.printList(true)} is ${reversedResultList.printList(true)}`);


const arr1 = [6, 1, 7];
const arr2 = [2, 9, 5];
const list1 = new LinkedList();
const list2 = new LinkedList();
const length = Math.max(arr1.length, arr2.length);
for(let i = 0; i < length_reverse; i++) {
    arr1[i] && list1.add(arr1[i]);
    arr2[i] && list2.add(arr2[i]);
}
areReversed = false;
const resultList = sumLists(list1, list2, areReversed);

console.log(`Sum of listA ${list1.printList(true)} and reversed listB ${list2.printList(true)} is ${resultList.printList(true)}`);
