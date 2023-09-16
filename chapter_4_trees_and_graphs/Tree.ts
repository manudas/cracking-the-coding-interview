import { GraphNode } from './Graph'
import { LinkedList } from './LinkedList'

export class BinarySearchTree<T> extends GraphNode<T> {
    static fromSortedArray(array: Array<unknown>) {
        if (array === null || array.length === 0) return null
        const midPoint = Math.floor(array.length / 2)
        const node = new BinarySearchTree(
            array[midPoint],
            LinkedList.fromArray<BinarySearchTree<unknown>>(
                [
                    BinarySearchTree.fromSortedArray(array.slice(0, midPoint)),
                    BinarySearchTree.fromSortedArray(array.slice(midPoint + 1))
                ]
            )
        )

        return node;
    }

    public children?: LinkedList<BinarySearchTree<T>>

    peekSmaller() {
        const smaller = this.children?.peek()
        if (smaller && smaller.element.node < this.node) {
            return smaller
        }
        return null
    }

    peekBigger() {
        const bigger = this.children?.peekLast()
        if (bigger && bigger.element.node > this.node) {
            return bigger
        }
        return null
    }
}