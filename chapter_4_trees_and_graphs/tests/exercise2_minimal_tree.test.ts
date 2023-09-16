import { minimalTree } from '../exercise2_minimal_tree';
import { LinkedList } from '../LinkedList';
import { BinarySearchTree } from '../Tree';

describe('Cracking the coding interview: Trees and graphs, exercise 2: minimal tree with sorted array', () => {
    const sortedArray = [1, 2, 3, 4, 5]
    let minimalTreeObj
    beforeAll(() => {
        const firstLeftBranch = new BinarySearchTree(2, (new LinkedList<BinarySearchTree<number>>).add(new BinarySearchTree(1)))
        const fistRightBranch = new BinarySearchTree(5, (new LinkedList<BinarySearchTree<number>>).add(new BinarySearchTree(4)))
        minimalTreeObj = new BinarySearchTree(3, (new LinkedList<BinarySearchTree<number>>).add(firstLeftBranch).add(fistRightBranch))
    })

    test('creates a minimum height tree on a sorted array', () => {
        const calculatedMinimumTree = minimalTree(sortedArray)
        expect(calculatedMinimumTree.toString()).toBe(minimalTreeObj.toString())
    })
});