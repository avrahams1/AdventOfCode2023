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
    add(number, atEnd = true) {
        if (atEnd) {
            this.numbers.push(number);
            
            const newLen = this.numbers.length;

            if (newLen === 2) {
                this.difference = this.numbers[1] - this.numbers[0];
            } else if (this.isSameDifference && newLen > 2) {
                this.isSameDifference = this.numbers[newLen - 1] - this.numbers[newLen - 2] === this.difference;
            }
        } else {
            this.numbers.unshift(number);
        }

        return this;
    }

    /**
     * 
     * @param {number[]} numbers
     * @returns same object
     */
    addMultiple(numbers, atEnd = true) {
        numbers.forEach(number => this.add(number, atEnd));
        return this;
    }

    addWithSameDifference(atEnd = true) {
        if (!this.isSameDifference) {
            debugger;
        }

        if (atEnd)
            this.numbers.push(this.numbers[this.numbers.length - 1] + this.difference);
        else
            this.numbers.unshift(this.numbers[0] - this.difference);
    }
}