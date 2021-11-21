/**
 * Statement:
 *
 * Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the
 * beginning of the loop.
 *
 * DEFINITION
 * Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so
 * as to make a loop in the linked list.
 *
 * EXAMPLE
 *
 * Input: A - > B - > C - > D - > E - > C [the same C as earlier)
 * Output: C
 *
 */

/* Floyd’s Cycle-Finding Algorithm */
const loopDetectionFloyds = (head) => {
    if (head === null) return null;
    let fastRunner = head;
    let slowRunner = head;

    // they always meet in the beginning of the loop
    // unless you have a healthy head before the loop has,
    // started in which case, if it's k nodes size, they'll
    // meet LOOP_SIZE - K elements before the loop start
    while (fastRunner && fastRunner.next !== null) {
        slowRunner = slowRunner.next;
        fastRunner = fastRunner.next.next;
        if (fastRunner === slowRunner) break;
    }

    if (!fastRunner || fastRunner.next === null) return null;

    slowRunner = head;

    // moving now slowRunner and fastRunner at the same pace,
    // we'll make them meet at the first node of the loop
    while (slowRunner !== fastRunner) {
        slowRunner = slowRunner.next;
        fastRunner = fastRunner.next;
    }

    return slowRunner;

}

const loopDetectionSet = (head) => {
    let node = head;
    const nodeSet = new Set();
    while (node !== null && !nodeSet.has(node)) {
        nodeSet.add(node);
        node = node.next;
    }

    // node could be null -> no loop
    // or could be already included in the set -> start of the loop
    return node;
}
const loopDetection = (list, floyds = true) => {
    if (floyds) {
        return loopDetectionFloyds(list.head);
    }
    return loopDetectionSet(list.head);
}

const testArrList = [
    [1, 2, [1, 2, 2, 3]], // loop at 1
    [1, 1], // no loop
    [], // no loop
    [[0, 1, 2, 1, 0]], // fully looped. Loop start at 0
];


const getBenchData = () => {

    const listArr = [];

    testArrList.forEach(arr => {
        const list = new LinkedList();

        arr.forEach(elem => {
            let lastElementOutOfLoop = null;
            if (Array.isArray(elem)) { // intersection foundlet node;
                let node;
                elem.forEach(loopedElement => {
                    node = new Node(loopedElement);
                    if (lastElementOutOfLoop === null) { // fully looped
                        lastElementOutOfLoop = node;
                    }
                    list.add(node, true);
                });
                node.next = lastElementOutOfLoop;
            } else {
                const node = new Node(elem);
                list.add(node, true);
                lastElementOutOfLoop = node;
            }

        });

        listArr.push(list);
    });

    return listArr;

}

const testRepetitions = 1000;

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

    const data = getBenchData();
    // data.forEach((string) => {
    //     isUnique(string);
    //     isUniqueNoAddictionalStructures(string);
    // });
	performance.mark(mark1);

    const loopFloydsAlgorithm = [];
    const loopSet = [];

    for (let i = 0; i < testRepetitions; i++) {
        data.forEach(( list, index) => {
            loopFloydsAlgorithm[index] = loopDetection(list, true);
            // resultIsUniqueNoAddictionalStructures[index] = isUniqueNoAddictionalStructures(string);
        });
    }

	performance.mark(mark2);

    for (let i = 0; i < testRepetitions; i++) {
        data.forEach((list, index) => {
            // resultIsUnique[index] = isUnique(string);
            loopSet[index] = loopDetection(list, false);
        });
    }

	performance.mark(mark3);

    // log:
    performance.measure("Test data generation", markStart, mark1);
    performance.measure("Floys loop detection", mark1, mark2);
    performance.measure("Loop detection with Set", mark2, mark3);

    // correctness check
    for (let i = 0; i < loopFloydsAlgorithm.length; i++) {
        const loopNodeWithFloyds = loopFloydsAlgorithm[i];
        const loopNodeWithSet = loopSet[i];
        const list = data[i];

        console.log(`Is list ${list.printList(true)} looped? Floyds: ${loopNodeWithFloyds ? 'true' : 'false'}.${loopNodeWithFloyds ? ' Loop start in node: ' + loopNodeWithFloyds.element + '.': ''} Set: ${loopNodeWithSet ? 'true' : 'false'}.${loopNodeWithSet ? ' Loop start in node: ' + loopNodeWithSet.element : ''}`);

        if (loopNodeWithFloyds !== loopNodeWithSet) {
            console.log(`ERROR in index ${i}!!: Is list ${list.printList(true)} looped? ${loopNodeWithFloyds ? loopNodeWithFloyds.element : 'false'} for Floys algorithm and ${loopNodeWithSet ? loopNodeWithSet.element : 'false'} for Set one`);
        }

    }
}

performaceSensitiveFunc();