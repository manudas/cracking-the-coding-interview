/*
 * Statement:
 * Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
 */

import { Graph, GraphNode } from "./Graph"

export function isConnected(_graph: Graph<unknown>, startNode: GraphNode<unknown>, endNode: GraphNode<unknown>, visitedNodeList: GraphNode<unknown>[] = []): boolean {

    if (startNode === endNode) return true
    if (visitedNodeList.includes(startNode)) return false
    return (startNode.children.toArray() ?? []).some((childNode) => isConnected(_graph, childNode.element, endNode, [...visitedNodeList, startNode]))
}