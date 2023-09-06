import { Stack } from '../Stack';
import { sortStack } from '../exercise5_sort_stack'

describe('Cracking the coding interview: Stacks and queues, exercise 5: sort stack', () => {
    const initialData =  [923, 2, 12, 3, 4, 1];
    const expectedSortedData = [923, 12, 4, 3, 2, 1]; // they will be sorted in reverse order

    let testingStack

    beforeEach(() => {
        testingStack = new Stack();
        initialData.forEach(element => testingStack.push(element));
    })

    test('should sort in decreasing order', () => {
        sortStack(testingStack);

        const comparisonStack = new Stack();
        expectedSortedData.forEach(element => comparisonStack.push(element));

        expect(comparisonStack.toString()).toEqual(testingStack.toString());
    })
});