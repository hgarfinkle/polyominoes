import { HashSet } from "./hashSet"

export type Point = {x: number, y: number}
function add(p1: Point, p2: Point): Point {
    return {x: p1.x + p2.x, y: p1.y + p2.y}
}

export type Polyomino = HashSet<Point>

export const directions = ['left', 'right', 'up', 'down'] as const
export type Direction = typeof directions[number]
type Diagonal = 'ru' | 'rd' | 'ld' | 'lu'
function toCoordinateDirections(diagonal: Diagonal): {x: "min" | "max", y: "min" | "max"} {
    switch (diagonal) {
        case "ru":
            return {x: "max", y: "max"}
        case "rd":
            return {x: "max", y: "min"}
        case "ld":
            return {x: "min", y: "min"}
        case "lu":
            return {x: "min", y: "max"}
        default:
            diagonal satisfies never
            return diagonal
    }
}
function opposite(diagonal: Diagonal): Diagonal {
    switch (diagonal) {
        case "ru": return "ld"
        case "rd": return "lu"
        case "ld": return "ru"
        case "lu": return "rd"
        default:
            diagonal satisfies never
            return diagonal
    }
}
function toCardinalDirections(diagonal: Diagonal): [Direction, Direction] {
    switch (diagonal) {
        case "ru": return ["right", "up"]
        case "rd": return ["right", "down"]
        case "ld": return ["left", "down"]
        case "lu": return ["left", "up"]
        default: 
            diagonal satisfies never
            return diagonal
    }
}
function toMove(direction: Direction): Point {
    switch (direction) {
        case "left": return {x: -1, y: 0}
        case "right": return {x: 1, y: 0}
        case "up": return {x: 0, y: 1}
        case "down": return {x: 0, y: -1}
    }
}
function moveInDirection(point: Point, direction: Direction): Point {
    return add(point, toMove(direction))
}


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
    return {x: {min: minX, max: maxX}, y: {min: minY, max: maxY}}
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
    for (let i = dims.x.min - 1; i <= dims.x.max + 1; i++) {
        for (let j = dims.y.min - 1; j <= dims.y.max + 1; j++) {
            gridPolyomino.add({x: i, y: j})
        }
    }
    return gridPolyomino
}

export function complementInContainingRectangle(pmino: Polyomino) {
    const grid = gridAroundPolyomino(pmino)
    return grid.setDifference(pmino)
}

export function isDiagonallyDirected(pmino: Polyomino, diagonal: Diagonal): boolean {
    const root = getRoot(pmino, opposite(diagonal))
    return pmino.values().every(point => point === root || toCardinalDirections(opposite(diagonal)).some(direction => pmino.has(moveInDirection(point, direction))))
}

// A cell can only be an root candidate if it is in the corner of the pmino's bounding box
function getRoot(pmino: Polyomino, direction: Diagonal): Point | undefined {
    const dims = dimensions(pmino)
    const asCoordinateDirections = toCoordinateDirections(direction)
    return pmino.get({x: dims.x[asCoordinateDirections.x], y: dims.y[asCoordinateDirections.y]})
}