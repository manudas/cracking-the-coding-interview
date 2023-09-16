import { LinkedList } from "./LinkedList";

export class GraphNode<T> {
    public node: T;
    public children?: LinkedList<GraphNode<T>>

    constructor(node: T, children?: LinkedList<GraphNode<T>> ) {
        this.node = node
        this.children = children ?? new LinkedList<GraphNode<T>>()
    }

    toString(): string {
        return `Graph head: ${this.node}, children: ${this.children?.toString()}`
    }
}
