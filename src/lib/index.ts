
export type Point = {x: number, y: number}

export type Polyomino = Set<Point>

export function size(polyomino: Polyomino) {
    return polyomino.size
}
