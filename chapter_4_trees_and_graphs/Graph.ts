import { LinkedList } from "./LinkedList";

export class GraphNode<T> {
    public node: T;
    public children?: LinkedList<GraphNode<T>>

    constructor(node: T, children?: LinkedList<GraphNode<T>>) {
        this.node = node
        this.children = children ?? new LinkedList<GraphNode<T>>()
    }
}

export class Graph<T> {
    public root: GraphNode<T>

    constructor(node: GraphNode<T>) {
        this.root = node
    }
}