import { minimalTree } from '../exercise2_minimal_tree';
import { nodesAtEachDepthLevel } from '../exercise3_list_of_depths';
import { LinkedList } from '../LinkedList';

describe('Cracking the coding interview: Trees and graphs, exercise 3: list of depths', () => {
    const sortedArray = [1, 2, 3, 4, 5]
    let minimalTreeFromArray
    let expectedListOfLevels = new LinkedList<LinkedList<number>>()
    beforeAll(() => {
        minimalTreeFromArray = minimalTree(sortedArray)
        expectedListOfLevels.insertAt((new LinkedList<number>()).add(3), 0)
        expectedListOfLevels.insertAt((new LinkedList<number>()).add(2).add(5), 1)
        expectedListOfLevels.insertAt((new LinkedList<number>()).add(1).add(4), 2)
    })

    test('checks the different levels', () => {
        const listOfLevels = nodesAtEachDepthLevel(minimalTreeFromArray)
        expect(listOfLevels?.toString()).toBe(expectedListOfLevels.toString())
    })
});