/**
 * Statement:
 *
 * Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but
 * ºthe first and last node, not necessarily the exact middle) of a singly linked list, given only access to
 * that node.
 *
 * ºEXAMPLE
 * Input: the node c from the linked list a - >b- >c - >d - >e- >f
 * Result: nothing is returned, but the new linked list looks like a -> b->d->e->f
 *
 */

const DeleteMiddleNodeRecursive = (node) => {
    if (node.next === null) {
        const value = node.element;
        // dummy node in case we are passing the last one
        // even though is not included in the statement
        node.element = null;
        return {
            element: value,
            next: null
        };
    }
    const {
        element = null,
        next = null,
    } = DeleteMiddleNodeRecursive(node.next);
    const {
        element: currentElement,
        // next: currentNext,
    } = node;
    node.element = element;
    node.next = next;

    return {
        element: currentElement,
        next: node,
    }
}

const DeleteMiddleNodeIterative = (node) => {
    if (node.next === null) {
        // Same as before, not included in the Statement
        // but we can do a dummy node
        node.element = null;
    }
    let runner = node;
    let previous = null;
    while (runner.next !== null) {
        runner.element = runner.next.element;
        previous = runner;
        runner = runner.next;
    }
    previous.next = null;
}

const DeleteMiddleNode = (node, recursive = true) => {
    if (recursive) DeleteMiddleNodeRecursive(node);
    else DeleteMiddleNodeIterative(node);
}


const getRandomList = (length) => {
    //const arr = Array.from({length}, () => Math.floor(Math.random() * length));
    const k = Math.floor(Math.random() * (length - 1)); // -1 not to include the last node
    const arr = [0,1,2,3,4,5,6,7,8,9];
    const list = new LinkedList();
    for (let i = 0; i < length; i++) {
        list.add(arr[i]);
    }

    // return {KIndex: k, KthElement: list.list[k+1] ? list.list[k+1] : null, list};
    return {KIndex: k, KthElement: arr[k + 1] ? arr[k + 1] : null, list};
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

    if (([a, b].filter(element => element !== null).length === 1 /* if just 1 is null, then they are different */)) {
        return false;
    } else if (([a, b].filter(element => element === null).length === 2 /* if they are both null, then is equal */)) {
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

	performance.mark(mark1);

    const resultDeleteMiddleNode = [];
    const resultDeleteMiddleNodeIterative = [];

    data.forEach(({KthElement, list, KIndex}, index) => {
        const modifiedList = LinkedList.clone(list);
        DeleteMiddleNode(modifiedList.list[KIndex]);
        resultDeleteMiddleNode[index] = {KthElement, list, newList: modifiedList.list[KIndex] };
        // resultIsUniqueNoAddictionalStructures[index] = isUniqueNoAddictionalStructures(string);
    });

	performance.mark(mark2);

    data.forEach(({KthElement, list, KIndex}, index) => {
        // resultIsUnique[index] = isUnique(string);
        const modifiedList = LinkedList.clone(list);
        DeleteMiddleNode(modifiedList.list[KIndex], false);
        resultDeleteMiddleNodeIterative[index] = {KthElement, list, newList: modifiedList.list[KIndex] };
    });

	performance.mark(mark3);

    // log:
    performance.measure("Random list generation", markStart, mark1);
    performance.measure("DeleteMiddleNode recursive", mark1, mark2);
    performance.measure("DeleteMiddleNode iterative", mark2, mark3);

    // correctness check
    for (let i = 0; i < resultDeleteMiddleNode.length; i++) {
        const {KthElement, newList, list} = resultDeleteMiddleNode[i];
        const {KthElement: KthElementIterative, newList: newListIterative, list: ListInteractive} = resultDeleteMiddleNodeIterative[i];
        // const elem2 = resultIsUniqueNoAddictionalStructures[i];

        if (KthElement && KthElement !== newList.element) {
            console.log(newList);
            // console.log(`ERROR in index, algorithm recursive ${i}!!: List head is not foreseen KthToEnd element: ${list.printList(true)}`);
        }

        if (KthElementIterative && KthElementIterative !== newListIterative.element) {
            console.log(`ERROR in index, algorithm iterative ${i}!!: List head is not foreseen KthToEnd element: ${ListInteractive.printList(true)}`);
        }

        if (([newList, newListIterative].filter(element => element !== null).length === 1 /* if just 1 is null, then they are different */)
            || (([newList, newListIterative].filter(element => element !== null).length === 2 /* if they are 2 diff of null, then we compare */)  && !listEquals(newList, newListIterative))) {
            console.log(`ERROR in index ${i}!!: List from iterative and recursive algorithm are different! Recursive: ${list.printList(true)} Iterative: ${ListInteractive.printList(true)}`);
        }

    }
}

performaceSensitiveFunc();