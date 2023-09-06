import { isConnected } from '../exercise1_route_between_nodes';
import { Graph, GraphNode } from "../Graph"
import { LinkedList } from '../LinkedList'

describe('Cracking the coding interview: Trees and graphs, exercise 1: route between nodes', () => {
    let testingGraph
    let thirdLevelGraph
    let unconnectedSecondLevelNode

    beforeEach(() => {
        // THIRD LEVEL
        thirdLevelGraph = new GraphNode('third')
        const secondLevelChildList = new LinkedList<GraphNode<string>>()
        secondLevelChildList.add(thirdLevelGraph)
        // SECOND LEVEL
        const connectedSecondLevelNode = new GraphNode('secondConnected', secondLevelChildList)
        unconnectedSecondLevelNode = new GraphNode('secondUnconnected')
        const connectedSecondLevelNode2 = new GraphNode('secondUnconnected2')
        const secondChildList = new LinkedList<GraphNode<string>>()
        secondChildList.add(connectedSecondLevelNode)
        secondChildList.add(unconnectedSecondLevelNode)
        secondChildList.add(connectedSecondLevelNode2)
        const secondLevelGraph = new GraphNode('second', secondChildList)
        // FIRST LEVEL
        const connectedFirstLevelNode = new GraphNode('firstConnected')
        connectedFirstLevelNode.children?.add(secondLevelGraph)
        const unconnectedFirstLevelNode = new GraphNode('firstUnconnected')
        const unconnectedFirstLevelNode2 = new GraphNode('firstUnconnected2')
        const firstChildList = new LinkedList<GraphNode<string>>()
        firstChildList.add(connectedFirstLevelNode)
        firstChildList.add(unconnectedFirstLevelNode)
        firstChildList.add(unconnectedFirstLevelNode2)
        // ROOT
        testingGraph = new Graph(new GraphNode('root', firstChildList))

        // LOOPS AND OTHER CONNECTIONS?
        // CURRENT CONNECTIONS: root->firstlevel->secondlevel->thirdlevel

        // let's connect thirdlevel with root and secondlevel with firstlevel
        // third level with root
        thirdLevelGraph.children?.add(testingGraph.root)

        // secondlevel with first level
        connectedSecondLevelNode2.children?.add(unconnectedFirstLevelNode2)
    })

    test('root is connected with third level', () => {
        expect(isConnected(testingGraph, testingGraph.root, thirdLevelGraph)).toBe(true)
    })

    test('second child of root node is not connected with root', () => {
        // is a directed graph so root is connected to second level unconnected but not the other way around
        expect(isConnected(testingGraph, unconnectedSecondLevelNode, testingGraph.root)).toBe(false);

    })
});