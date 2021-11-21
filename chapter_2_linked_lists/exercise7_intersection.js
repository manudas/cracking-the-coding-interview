/**
 * Statement:
 *
 * Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the
 * intersecting node. Note that the intersection is defined based on reference, not value. That is, if the
 * kth node of the first linked list is the exact same node (by reference) as the jth node of the second
 * linked list, then they are intersecting.
 *
 */

/* Pass in the head of the linked list around */
const intersectRecursive = (nodeA, nodeB) => {
    if (nodeA === null && nodeB === null) {
        return [false, null];  // empty lists passed in
    }
    if (nodeA.next === null && nodeB.next === null) {
        if(nodeA === nodeB) {
            return [true, nodeA];
        }
        return [false, null];
    }

    const [intersect, intersectionNode] = intersectRecursive(nodeA.next !== null ? nodeA.next : nodeA, nodeB.next !== null ? nodeB.next : nodeB);
    if (!intersect) {
        return [false, null];
    }

    if (nodeA === nodeB) {
        return [true, nodeA]
    }

    return [intersect, intersectionNode];
}

const intersectIterative = (headA, headB) =>{
    let runnerA = headA;
    let runnerB = headB;
    let lenghtA = 0;
    let lenghtB = 0;
    if (headA === null || headB === null) {
        return [false, null];
    }
    while (runnerA.next !== null && runnerB.next !== null) {
        lenghtB++;
        lenghtA++;
        runnerA = runnerA.next;
        runnerB = runnerB.next;
    }
    let shorter, larger;
    if (runnerA.next = null) {
        shorter = headA;
        larger = runnerB;
    } else {
        shorter = headB;
        larger = runnerA;
    }

    while (larger.next !== null) {
        if (shorter === headA) {
            lenghtB++;
        } else {
            lenghtA++;
        }
        larger = larger.next;
    }

    if (shorter === headA) {
        if (larger !== runnerA) {
            return [false, null]
        }
        larger = headB;
    } else {
        if (larger !== runnerB) {
            return [false, null];
        }
        larger = headA;
    }

    const lengthDiff = Math.abs(lenghtA - lenghtB);

    for (let i = 0; i < lengthDiff; i++) {
        larger = larger.next;
    }

    while (larger !== shorter && larger !== null) {
        larger = larger.next;
        shorter = shorter.next;
    }

    return [true, larger];
}

const intersect = (listA, listB, recursive = true) => {
    if (recursive) {
        // return isPalindromeRecursive(list.head, size)[1];
        return intersectRecursive(listA.head, listB.head);
    }
    return intersectIterative(listA.head, listB.head);
}

const testArrList = [
    [[1, 2, [1, 2, 2, 3]]], // intersect in 1
    [[1, 1], [1, 2]], // no intersection
    [[]], // no intersection
    [[[0, 1, 2, 1, 0]]], // fully intersected
];

testArrList.forEach(arr => {
    const list1 = new LinkedList();
    const list2 = new LinkedList();
    if (!arr[1]) { // no second array, there's an intersection
        arr[0].forEach(elem => {
            if (Array.isArray(elem)) { // intersection found
                elem.forEach(intersected => {
                    const node = new Node(intersected);
                    list1.add(node, true);
                    list2.add(node, true);
                });
            } else {
                list1.add(elem);
                list2.add(elem);
            }

        })
    } else { // no inersection at all
        arr[0].forEach(elem => {
            list1.add(elem);
        });
        arr[1].forEach(elem => {
            list2.add(elem);
        });
    }
    const [intersectResult, intersectNode] = intersect(list1, list2, false);
    console.log(`Is list ${list1.printList(true)} intersected with list2 ${list2.printList(true)}? ${intersectResult}${intersectResult ? ' in node: ' + intersectNode.element : ''}`);
});
