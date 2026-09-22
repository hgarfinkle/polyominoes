import { HashSet } from "./hashSet"

export type Point = {x: number, y: number}

export type Polyomino = HashSet<Point>

export const directions = ['left', 'right', 'up', 'down'] as const
export type Direction = typeof directions[number]

function dimensions(pmino: Polyomino) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    pmino.values().forEach(point => {
        minX = Math.min(minX, point.x)
        minY = Math.min(minY, point.y)
        maxX = Math.max(maxX, point.x)
        maxY = Math.max(maxY, point.y)
    })
    return {minX, minY, maxX, maxY}
}

function neighbors(p: Point): Point[] {
    return [
        {x: p.x + 1, y: p.y},
        {x: p.x - 1, y: p.y},
        {x: p.x, y: p.y + 1},
        {x: p.x, y: p.y - 1}
    ]
}

// TODO use or remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function polyominoNeighbors(polyomino: Polyomino): HashSet<Point> {
    const visited = new HashSet<Point>()
    for (const cell of polyomino.values()) {
        for (const neighbor of neighbors(cell)) {
            if (!polyomino.has(neighbor) && !visited.has(neighbor)) {
                visited.add(neighbor)
            }
        }
    }
    return visited
}

function gridAroundPolyomino(pmino: Polyomino): Polyomino {
    const gridPolyomino = new HashSet<Point>()
    const dims = dimensions(pmino)
    for (let i = dims.minX - 1; i <= dims.maxX + 1; i++) {
        for (let j = dims.minY - 1; j <= dims.maxY + 1; j++) {
            gridPolyomino.add({x: i, y: j})
        }
    }
    return gridPolyomino
}

// A Hole is a collection of cells that are orthogonally connected to each other,
// but are not orthogonally connected to the outside of the polyomino. 

export function complementInContainingRectangle(pmino: Polyomino) {
    const grid = gridAroundPolyomino(pmino)
    return grid.setDifference(pmino)
}
