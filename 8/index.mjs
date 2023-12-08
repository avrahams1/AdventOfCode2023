import { smallInput, smallInput2, bigInput } from "./input.mjs";
import { parseLines } from "../common/parsing.mjs";
import { Direction, parseDirection } from "./Direction.mjs";
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
        const nodeLineRgx = /(?<nodeName>[A-Z]+) = \((?<leftNodeName>[A-Z]+), (?<rightNodeName>[A-Z]+)\)/;
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
        nodesMap
    };
})(bigInput);

let numOfSteps = 0;
let directionIndex = 0;
let node = parsedInput.nodesMap.get('AAA');

while (node.nodeName !== 'ZZZ') {
    numOfSteps++;
    node = parsedInput.directions[directionIndex] === Direction.L ? node.left : node.right;
    directionIndex = (directionIndex + 1) % parsedInput.directions.length;
}

console.log(numOfSteps);