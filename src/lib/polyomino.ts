import type { HashSet } from "./hashSet"

export type Point = {x: number, y: number}

export type Polyomino = HashSet<Point>

export function size(polyomino: Polyomino) {
    return polyomino.size()
}
