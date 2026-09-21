import type { HashSet } from "./hashSet"
import type { Point, Polyomino } from "./polyomino"

export type Graph<T> = {
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

function getVerticesInConnectedComponent<T>(g: Graph<T>, v0: T) {
    if (!g.vertices.has(v0)) return []
    const visited: T[] = []
    function dFS(v: T) {
        if (visited.includes(v)) return
        visited.push(v)
        const neighbors = getNeighbors(g, v)
        console.log(v, neighbors, g.edges)
        getNeighbors(g, v).forEach(dFS)
    }
    dFS(v0)
    return visited
}

export function isConnected<T>(g: Graph<T>): boolean {
    const arbitraryVertex = g.vertices.values().next().value
    if (arbitraryVertex) {
        return getVerticesInConnectedComponent(g, arbitraryVertex).length === g.vertices.size()
    }
    return false
}