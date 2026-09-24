import type { HashSet } from "./hashSet"
import type { Point, Polyomino } from "./polyomino"

export type Graph<T = unknown> = {
    vertices: HashSet<T>,
    edges: [T, T][]
}

// Only returns cell to right and below, so each desired graph edge is counted once.
export function getOrthogonalNeighbors(p: Point): Point[] {
    return [
        {x: p.x, y: p.y + 1},
        {x: p.x + 1, y: p.y}
    ]
}

// Only returns cells in half the directions, so each desired graph edge is counted once. 
export function getDiagonalNeighbors(p: Point): Point[] {
    return [
        {x: p.x, y: p.y + 1},
        {x: p.x + 1, y: p.y},
        {x: p.x + 1, y: p.y + 1},
        {x: p.x - 1, y: p.y + 1}
    ]
}

export function toGraph(polyomino: Polyomino, getNeighbors: (point: Point) => Point[]): Graph<Point> {
    const edges : [Point, Point][] = []
    // TODO avoid for loops, use iterator manipulation
    for (const cell of polyomino.values()) {
        for (const neighbor of getNeighbors(cell)) {
            const neighborInPmino = polyomino.get(neighbor)
            if (neighborInPmino) {
                edges.push([cell, neighborInPmino])
            }
        }
    }

    return {
        vertices: polyomino,
        edges: edges
    }
}

function getNeighbors<T>(g: Graph<T>, v: T): T[] {
    if (!g.vertices.has(v)) {
        return []
    }
    return [
        ...g.edges.filter(e => e[0] === v).map(e => e[1]),
        ...g.edges.filter(e => e[1] === v).map(e => e[0])
    ]
}

export function getConnectedComponents<T>(g: Graph<T>): T[][] {
    const visited: T[] = []   
    function dFS(v: T, collector: T[]) {
        if (visited.includes(v)) return
        visited.push(v)
        collector.push(v)
        getNeighbors(g, v).forEach(v1 => dFS(v1, collector))
    }
    
    const components: T[][] = []
    g.vertices.values().forEach(v => {
        if (!visited.includes(v)) {
            const currentComponent: T[] = []
            dFS(v, currentComponent)
            components.push(currentComponent)
        }
    })
    return components
}