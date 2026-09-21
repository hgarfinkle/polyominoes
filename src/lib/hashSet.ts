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

    size() {
        return this.map.size
    }

    values() {
        return this.map.values()
    }

    has(value: T) {
        return this.map.has(this.hash(value))
    }

    private hash(value: T) {
        return JSON.stringify(value)
    }
}