export default class GeneralSet {
    constructor(initialValue) {
        this.map = new Map();
        this[Symbol.iterator] = this.values;

        if (!initialValue) {
            return;
        }

        if (initialValue instanceof Array) {
            this.addMultiple(...initialValue);
        } else {
            this.add(initialValue);
        }
    }

    add(item) {
        this.map.set(item.toIdString(), item);
    }

    addMultiple(...items) {
        for (const item of items) {
            this.add(item);
        }
    }

    values() {
        return this.map.values();
    }

    delete(item) {
        return this.map.delete(item.toIdString());
    }
}