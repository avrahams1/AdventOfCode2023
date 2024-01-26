/**
 * A sorted array with unique values
 * @template T
 */
export class SortedArray {
    /**
     * 
     * @param {(a: T, b: T) => number} comparer 
     * @param {T[]} arr
     */
    constructor(comparer, arr = []) {
        this.comparer = comparer;
        /**
         * @type T[]
         */
        this.array = [];

        for (const value of arr) {
            this.insert(value);
        }
    }

    /**
     * 
     * @param {T} value 
     */
    insert(value) {
        if (this.search(value)) {
            return;
        }

        const index = locationOf(value, this.array, this.comparer) + 1;
        this.array.splice(index, 0, value);
    }

    /**
     * 
     * @param {T} value 
     * @returns {boolean}
     */
    search(value) {
        return internalSearch(value, this.array, this.comparer, 0, this.array.length - 1);
    }

    /**
     * @param {T} value 
     * @returns {Number}
     */
    findClosestIndexOver(value) {
        const index = locationOf(value, this.array, this.comparer) + 1;

        if (this.isIndexInArray(index - 1) && this.comparer(this.array[index - 1], value) === 0) {
            return index - 1;
        }

        if (!this.isIndexInArray(index)) {
            return null;
        }

        return index;
    }

    /**
     * @param {T} value 
     * @returns {Number}
     */
    findClosestIndexUnder(value) {
        const index = locationOf(value, this.array, this.comparer);

        if (this.array[index] === undefined) {
            return null;
        }

        return index;
    }

    /**
     * 
     * @param {Number} index 
     * @returns {Boolean}
     */
    isIndexInArray(index) {
        return this.array[index] !== undefined;
    }
}

function locationOf(element, array, comparer, start, end) {
    if (array.length === 0)
        return -1;

    start = start || 0;
    end = end || array.length;
    var pivot = (start + end) >> 1;  // should be faster than dividing by 2

    var c = comparer(element, array[pivot]);
    if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

    switch (c) {
        case -1: return locationOf(element, array, comparer, start, pivot);
        case 0: return pivot;
        case 1: return locationOf(element, array, comparer, pivot, end);
    };
};

function internalSearch(value, arr, comparer, start, end) {
    // Base Condition
    if (start > end) return false;
 
    // Find the middle index
    let mid = Math.floor((start + end) / 2);
 
    // Compare mid with given key x
    if (comparer(arr[mid], value) === 0) return true;
 
    // If element at mid is greater than x,
    // search in the left half of mid
    if (comparer(arr[mid], value) > 0)
        return internalSearch(value, arr, comparer, start, mid - 1);
    else
        // If element at mid is smaller than x,
        // search in the right half of mid
        return internalSearch(value, arr, comparer, mid + 1, end);
}