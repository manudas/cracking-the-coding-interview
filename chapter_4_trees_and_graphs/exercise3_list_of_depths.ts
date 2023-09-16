import { LinkedList } from "./LinkedList";
import { BinarySearchTree } from "./Tree";

/*
 * Statement:
 * List of Depths: Given a binary tree, design an algorithm which creates a linked list of all
 * the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).
 */
export const nodesAtEachDepthLevel = (binarySearchTree: BinarySearchTree<unknown> | null | undefined, currentLevel: number = 0, resultingLinkedList = new LinkedList<LinkedList<unknown>>()) => {
    if (binarySearchTree == null) return resultingLinkedList
    let existingLinkedList = resultingLinkedList.elementAt(currentLevel);
    let existingList = !!existingLinkedList;
    if (!existingList) {
        existingLinkedList = new LinkedList<LinkedList<unknown>>()
        resultingLinkedList.insertAt(existingLinkedList, currentLevel)
    }
    existingLinkedList!.add(binarySearchTree.node)
    nodesAtEachDepthLevel(binarySearchTree.peekSmaller()?.element, currentLevel + 1, resultingLinkedList)
    nodesAtEachDepthLevel(binarySearchTree.peekBigger()?.element, currentLevel + 1, resultingLinkedList)

    return resultingLinkedList
}