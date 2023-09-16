import { BinarySearchTree } from "./Tree";

/*
 * Statement:
 * Minimal Tree: Given a sorted (increasing order) array with unique integer
 * elements, write an algorithm to create a binary search tree with minimal height.
 */
export const minimalTree = (sortedArray: Array<unknown>) => BinarySearchTree.fromSortedArray(sortedArray)