export default class History {
    constructor() {
        /**
         * @type {number[]}
         */
        this.numbers = [];

        this.isSameDifference = true;
        this.difference = null;
    }

    /**
     * 
     * @param {number} number 
     * @returns same object
     */
    add(number) {
        this.numbers.push(number);
        
        const newLen = this.numbers.length;

        if (newLen === 2) {
            this.difference = this.numbers[1] - this.numbers[0];
        } else if (this.isSameDifference && newLen > 2) {
            this.isSameDifference = this.numbers[newLen - 1] - this.numbers[newLen - 2] === this.difference;
        }

        return this;
    }

    /**
     * 
     * @param {number[]} numbers
     * @returns same object
     */
    addMultiple(numbers) {
        numbers.forEach(this.add.bind(this));
        return this;
    }

    addWithSameDifference() {
        if (!this.isSameDifference) {
            debugger;
        }

        this.numbers.push(this.numbers[this.numbers.length - 1] + this.difference);
    }
}