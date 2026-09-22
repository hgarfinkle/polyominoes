export class HashSet<T> {
    map: Map<string, T>

    constructor(iterable?: Iterable<T>) {
        this.map = new Map();
        if (iterable) {
            for (const item of iterable) {
                this.add(item)
            }
        }
    }

    add(value: T) {
        return this.map.set(this.hash(value), value)
    }

    get size() {
        return this.map.size
    }

    values() {
        return this.map.values()
    }

    has(value: T) {
        return this.map.has(this.hash(value))
    }

    // Useful for getting the referentially-identical value in the map
    get(value: T) {
        return this.map.get(this.hash(value))
    }

    delete(value: T) {
        return this.map.delete(this.hash(value))
    }

    clone() {
        return new HashSet<T>(this.values())
    }

    // Not every day you get to use the word "subtrahend"
    // One of life's little joys!
    setDifference(subtrahend: HashSet<T>) {
        const clone = this.clone()
        subtrahend.values().forEach(clone.delete.bind(clone))
        return clone
    }

    private hash(value: T) {
        return JSON.stringify(value)
    }
}