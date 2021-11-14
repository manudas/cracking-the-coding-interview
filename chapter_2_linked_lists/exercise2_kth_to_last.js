/**
 * Statement:
 *
 * Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
 *
 */

const KthToLastRecursive = (node, k) => {
    if (node === null) {
        return 0;
    }
    const elementOrIndex = KthToLastRecursive(node.next, k);
    if (isNaN(elementOrIndex)) { // not an index
        return elementOrIndex;
    }
    const indexFromLast = elementOrIndex + 1;
    if (k === indexFromLast) {
        return node;
    }

    return indexFromLast;
}

const KthToLastIterative = (node, k) => {
    let endNode = node;
    for (let i = 0; i < k; i++) {
        if (endNode === null) {
            return null;
        }
        endNode = endNode.next;
    }

    let startNode = node;
    while (endNode !== null) {
        startNode = startNode.next;
        endNode = endNode.next;
    }

    return startNode;
}

const KthToLast = (list, k, recursive = true) => {
    if (recursive) {
        const node = KthToLastRecursive(list.head, k, recursive);
        return (isNaN(node) ? node : null);
    }
    return KthToLastIterative(list.head, k);
}


const getRandomList = (length) => {
    const arr = Array.from({length}, () => Math.floor(Math.random() * length));
    const k = Math.floor(Math.random() * length);
    // const arr = [1,2,1,2,1,2];
    const list = new LinkedList();
    for (let i = 0; i < length; i++) {
        list.add(arr[i]);
    }

    return {KIndex: k, KthElement: arr[arr.length-k] ? arr[arr.length-k] : null, list};
}

const generateRandomTestingBenchData = () => {
    const elementCounter = 1000;
    const data = [];
    for (let index = 0; index < elementCounter; index++) {
        data[index] = getRandomList(10);
    }

    return data;
}

const listEquals = (a, b) => {

    if (([newList, newListIterative].filter(element !== null) === 1 /* if just 1 is null, then they are different */)) {
        return false;
    } else if (([newList, newListIterative].filter(element !== null) === 1 /* if they are both null, then is equal */)) {
        return true;
    }
    return a.element === b.element && listEquals(a.next, b.next);
}

const performaceSensitiveFunc = () => {
    const obs = new PerformanceObserver((list, observer) => {
        console.log(list.getEntriesByType('measure'));
        observer.disconnect();
    });
    obs.observe({ entryTypes: ['measure'] });

	const markStart = "mark_start";
	const mark1 = "mark1";
	const mark2 = "mark2";
	const mark3 = "mark3";

	performance.mark(markStart);

    const data = generateRandomTestingBenchData();
    // data.forEach((string) => {
    //     isUnique(string);
    //     isUniqueNoAddictionalStructures(string);
    // });
	performance.mark(mark1);

    const resultKthElement = [];
    const resultKthElementIterative = [];

    data.forEach(({KthElement, list, KIndex}, index) => {
        resultKthElement[index] = {KthElement, list, newList: KthToLast(LinkedList.clone(list), KIndex) };
        // resultIsUniqueNoAddictionalStructures[index] = isUniqueNoAddictionalStructures(string);
    });

	performance.mark(mark2);

    data.forEach(({KthElement, list, KIndex}, index) => {
        // resultIsUnique[index] = isUnique(string);
        resultKthElementIterative[index] = {KthElement, list, newList: KthToLast(LinkedList.clone(list), KIndex, false) };
    });

	performance.mark(mark3);

    // log:
    performance.measure("Random list generation", markStart, mark1);
    performance.measure("KthToLast recursive", mark1, mark2);
    performance.measure("KthToLast iterative", mark2, mark3);

    // correctness check
    for (let i = 0; i < resultKthElement.length; i++) {
        const {KthElement, newList, list} = resultKthElement[i];
        const {KthElement: KthElementIterative, newList: newListIterative, list: ListInteractive} = resultKthElementIterative[i];
        // const elem2 = resultIsUniqueNoAddictionalStructures[i];

        if (KthElement && KthElement !== newList.element) {
            console.log(`ERROR in index, algorithm recursive ${i}!!: List head is not foreseen KthToEnd element: ${list.printList(true)}`);
        }

        if (KthElementIterative && KthElementIterative !== newListIterative.element) {
            console.log(`ERROR in index, algorithm iterative ${i}!!: List head is not foreseen KthToEnd element: ${ListInteractive.printList(true)}`);
        }

        if (([newList, newListIterative].filter(element => element !== null) === 1 /* if just 1 is null, then they are different */)
            || (([newList, newListIterative].filter(element => element !== null) === 2 /* if they are 2 diff of null, then we compare */)  && !listEquals(newList, newListIterative))) {
            console.log(`ERROR in index ${i}!!: List from iterative and recursive algorithm are different! Recursive: ${list.printList(true)} Iterative: ${ListInteractive.printList(true)}`);
        }

    }
}

performaceSensitiveFunc();