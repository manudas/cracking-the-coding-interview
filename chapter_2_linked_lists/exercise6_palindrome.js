/**
 * Statement:
 *
 * Palindrome: Implement a function to check if a linked list is a palindrome.
 *
 * Example:
 *
 * Input:
 * 0 - > 1 - > 2 - > 1 - > 0
 *
 * Output:
 * true
 *
 */

/* Pass in the head of the linked list around */
const isPalindromeRecursive = (node, lenght) => {
    if (node == null) return [null, true]; // base case 1: list = [] empty list is a palindrome too,
    if (lenght === 0 || lenght === 1) { // base case 2: middle of the list
        if (lenght === 1) return [node.next.element, true]; // odd number of elements, [x] is a palindrome too
        return [node.element, true]; // even number of elements
    }

    const [nextElement, currentComparison] =  isPalindromeRecursive(node.next, lenght - 2);
    if (!currentComparison) {
        return [null, false];
    }
    return [node.next, currentComparison && node.element === nextElement];
}

const isPalindrome = (list, size, recursive = true) => {
    if (recursive) {
        // return isPalindromeRecursive(list.head, size)[1];
        return isPalindromeRecursive(list.head, size)[0];
    }
    return isPalindromeIterative(list.head, size);
}


const isPalindromeIterative = (headNode, size) => {
    if (size === 0 || size === 1) return true;
    // else we create a stack (will reverse order) with the
    // elements from head to list.size / 2
    const isEven = !(size & 1);
    const stack = [];
    let runner = headNode;
    let counter = 0;
    while (counter < size / 2) {
        stack.push(runner.element);
        runner = runner.next;
        counter++;
    }
    if (!isEven) {
        stack.pop();
    }
    while (runner !== null) {
        if (runner.element !== stack.pop()) {
            return false;
        }
        runner = runner.next;
    }

    return true;
}

const testArrList = [
    [1, 2, 1], // is palindrome
    [1, 1], // is palindrome
    [], // is palindrome
    [0, 1, 2, 1, 0], // is palindrome
    [0, 1, 1, 0], // is palindrome
    [0, 0, 2, 1, 0], // is NOT palindrome
    [0, 1, 2, 7, 0], // is NOT palindrome
];

testArrList.forEach(arr => {
    const list = LinkedList.fromArray(arr);
    console.log(`Is list ${list.printList(true)} a palindrome? ${isPalindrome(list, list.size, false)}`);
});
