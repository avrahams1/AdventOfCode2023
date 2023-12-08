import { Direction } from "./Direction.mjs";

export default class Node {
    /**
     * 
     * @param {string} nodeName 
     */
    constructor(nodeName) {
        this.nodeName = nodeName;
        /**
         * @type {Node}
         */
        this.right = null;
        /**
         * @type {Node}
         */
        this.left = null;

        const lastChar = nodeName.charAt(nodeName.length - 1);
        this.isStartNode = lastChar === 'A';
        this.isEndNode = lastChar === 'Z';
    }

    /**
     * 
     * @param {Direction} direction 
     * @returns {Node}
     */
    getChild(direction) {
        return direction === Direction.L ? this.left : this.right;
    }
}