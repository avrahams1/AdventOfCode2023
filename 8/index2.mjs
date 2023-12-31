import memoize from "memoize";
import { lcm } from "mathjs";
import { smallInput3, bigInput, smallInput, smallInput2 } from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";
import { parseDirection } from "./Direction.mjs";
import Node from "./Node.mjs";

const parsedInput = ((input) => {
    /**
     * 
     * @param {Map<string, Node>} map 
     * @returns {(nodeName: string) => Node}
     */
    function getOrCreateNodeFactory(map) {
        return nodeName => {
            if (!map.has(nodeName)) {
                map.set(nodeName, new Node(nodeName));
            }

            return map.get(nodeName);
        };
    }

    const [directionsString, ...nodeStrings] = parseLines(input);
    const directions = directionsString.split('').map(parseDirection);

    /**
     * @type {Map<string, Node>}
     */
    const nodesMap = nodeStrings.reduce((map, nodeString) => {
        const getOrCreateNode = getOrCreateNodeFactory(map);
        const nodeLineRgx = /(?<nodeName>[A-Z0-9]+) = \((?<leftNodeName>[A-Z0-9]+), (?<rightNodeName>[A-Z0-9]+)\)/;
        const match = nodeString.match(nodeLineRgx);

        if (!match) {
            debugger;
        }

        const { nodeName, leftNodeName, rightNodeName } = match.groups;
        const node = getOrCreateNode(nodeName);
        node.left = getOrCreateNode(leftNodeName);
        node.right = getOrCreateNode(rightNodeName);

        return map;
    }, new Map());

    return {
        directions,
        nodes: [...nodesMap.values()]
    };
})(bigInput);

const numOfSteps = ((parsedInput) => {
    const spinResult = memoize(node => {
        let currNode = node;

        for (const direction of directions) {
            currNode = currNode.getChild(direction);
        }
        
        return currNode;
    }, {
        cacheKey: ([node]) => node.nodeName
    });

    function spinOnce(nodeWithRepetitionCounter) {
        nodeWithRepetitionCounter.numOfDirectionRepetitions++;
        nodeWithRepetitionCounter.node = spinResult(nodeWithRepetitionCounter.node);
    }

    function spinUntilEndNode(nodeWithRepetitionCounter) {
        do {
            spinOnce(nodeWithRepetitionCounter);
        } while (!nodeWithRepetitionCounter.node.isEndNode);
    }

    const { directions, nodes } = parsedInput;
    const nodesWithRepetitionCounters = nodes.filter(node => node.isStartNode).map(node => ({
        node,
        numOfDirectionRepetitions: 0
    }));

    for (const nodeWithRepetitionCounters of nodesWithRepetitionCounters) {
        spinUntilEndNode(nodeWithRepetitionCounters);
    }

    return lcm(...nodesWithRepetitionCounters.map(nodeWithRepetitionCounter => nodeWithRepetitionCounter.numOfDirectionRepetitions * directions.length));
})(parsedInput);

console.log(numOfSteps);