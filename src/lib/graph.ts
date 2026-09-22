import type { HashSet } from "./hashSet"
import type { Point, Polyomino } from "./polyomino"

export type Graph<T = unknown> = {
    vertices: HashSet<T>,
    edges: [T, T][]
}

export function toGraph(polyomino: Polyomino): Graph<Point> {
    const edges : [Point, Point][] = []
    // TODO avoid for loops, use iterator manipulation
    for (const cell of polyomino.values()) {
        const cellBelow = polyomino.get({x: cell.x, y: cell.y + 1})
        if (cellBelow) {
            edges.push([cell, cellBelow])
        }
        const cellToRight = polyomino.get({x: cell.x + 1, y: cell.y})
        if (cellToRight) {
            edges.push([cell, cellToRight])
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