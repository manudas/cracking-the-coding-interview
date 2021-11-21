// import LinkedList from './LinkedList'; // testing as a local file can't use export / import
/**
 * Statement:
 *
 * Remove Dups: Write code to remove duplicates from an unsorted linked list.
 *
 * FOLLOW UP
 *
 * How would you solve this problem if a temporary buffer is not allowed?
 *
 */

const RemoveDups = (list) => {
    const elementSet = new Set();
    let node = list.head;
    let elementIndex = 0;
    while (node != null) {
        if (elementSet.has(node.element)) {
            list.removeFrom(elementIndex);
        } else {
            elementSet.add(node.element);
            elementIndex++;
        }
        node = node.next;
    }

    return list;
}

const RemoveDupsNoBuffer = (list) => {
    let current = list.head;
    let elementIndex = 1;
    while (current != null) {
        const lastIndex = elementIndex;
        let runner = current.next;
        while (runner != null) {
            if (runner.element === current.element) {
                list.removeFrom(elementIndex);
            } else {
                elementIndex++;
            }
            runner = runner.next;
        }

        current = current.next;
        elementIndex = lastIndex + 1;
    }

    return list;
}

const getRandomList = (length) => {
    const arr = Array.from({length}, () => Math.floor(Math.random() * length));
    // const arr = [1,2,1,2,1,2];
    const set = new Set(arr);
    const list = new LinkedList();
    for (let i = 0; i < length; i++) {
        list.add(arr[i]);
    }

    return {hasDuplicated: arr.length !== set.size, list};
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
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val.element === b[index].element);
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

    const resultRemoveDups = [];
    const resultRemoveDupsNoAddictionalStructures = [];

    data.forEach(({hasDuplicated, list}, index) => {
        resultRemoveDups[index] = {hasDuplicated, newList: RemoveDups(LinkedList.clone(list)) };
        // resultIsUniqueNoAddictionalStructures[index] = isUniqueNoAddictionalStructures(string);
    });

	performance.mark(mark2);

    data.forEach(({hasDuplicated, list}, index) => {
        // resultIsUnique[index] = isUnique(string);
        resultRemoveDupsNoAddictionalStructures[index] = {hasDuplicated, newList: RemoveDupsNoBuffer(LinkedList.clone(list)) };
    });

	performance.mark(mark3);

    // log:
    performance.measure("Random list generation", markStart, mark1);
    performance.measure("RemoveDups with Set", mark1, mark2);
    performance.measure("RemoveDups without addictional buffer structure and with inner looping", mark2, mark3);

    // correctness check
    for (let i = 0; i < resultRemoveDups.length; i++) {
        const {hasDuplicated, newList} = resultRemoveDups[i];
        const {hasDuplicated: hasDuplicatedNoBuffer, newList: newListNoBuffer} = resultRemoveDupsNoAddictionalStructures[i];
        // const elem2 = resultIsUniqueNoAddictionalStructures[i];

        if (hasDuplicated) {
            const setRemoveDups = new Set(newList.toArray());

            if (newList.getSize() !== setRemoveDups.size) {
                console.log(`ERROR in index ${i}!!: List from RemoveDups has duplicated elements: ${newList.printList(true)}`);
            }
        }

        if (hasDuplicatedNoBuffer) {
            const setRemoveDups = new Set(newListNoBuffer.toArray());

            if (newListNoBuffer.getSize() !== setRemoveDups.size) {
                console.log(`ERROR in index ${i}!!: List from RemoveDupsNoBuffer has duplicated elements: ${newListNoBuffer.printList(true)}`);
            }
        }

        if (!listEquals(newList.list, newListNoBuffer.list)) {
            console.log(`ERROR in index ${i}!!: List from RemoveDups and RemoveDupsNoBuffer are different! RemoveDups: ${newList.printList(true)} RemoveDupsNoBuffer: ${newListNoBuffer.printList(true)}`);
        }

    }
}

performaceSensitiveFunc();