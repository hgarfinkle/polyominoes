import { HashSet } from './hashSet'
import type { Polyomino } from './polyomino'
import type { Point } from './point'

type Edge<T> = [T, T]

type GraphArgs<T> = [vertices: HashSet<T>, edges: Edge<T>[]]
abstract class Graph<Self extends Graph<Self, T>,T = unknown> {
	protected readonly vertices: HashSet<T>
	protected readonly edges: Edge<T>[]

	protected constructor(vertices: HashSet<T>, edges: Edge<T>[]) {
		this.vertices = vertices
		this.edges = edges
	}

	abstract neighbors(v: T): T[]

	protected traverse(source: T): T[] {
		if (!this.vertices.has(source)) {
			return []
		}
		const visited: T[] = []
		const toTraverse = [source]
		while (toTraverse.length) {
			const next = toTraverse.pop()
			if (next && !visited.includes(next)) {
				visited.push(next)
				toTraverse.push(...this.neighbors(next))
			}		
		}
		return visited
	}

	inducedSubgraph(vertices: T[]): Self {
		const inducedVertices = new HashSet(vertices.map(v => this.vertices.get(v)).filter<T>(maybe => maybe !== undefined))
		const inducedEdges = this.edges.filter(e => inducedVertices.has(e[0]) && inducedVertices.has(e[1]))
		return this.construct(inducedVertices, inducedEdges)
	}

	protected abstract construct(vertices: HashSet<T>, edges: Edge<T>[]): Self

	static fromPolyomino<U extends Graph<U, Point>>(this: new (vertices: HashSet<Point>, edges: Edge<Point>[]) => U, pmino: Polyomino, getNeighbors: (p: Point) => Point[]): Graph<U, Point> {
		const edges: Edge<Point>[] = []
	// TODO avoid for loops, use iterator manipulation
	for (const cell of pmino.values()) {
		for (const neighbor of getNeighbors(cell)) {
			const neighborInPmino = pmino.get(neighbor)
			if (neighborInPmino) {
				edges.push([cell, neighborInPmino])
			}
		}
	}

	return new this(pmino, edges)
	}

}

// Only returns cell to right and below, so each desired graph edge is counted once.
export function getOrthogonalNeighbors(p: Point): Point[] {
	return [
		{ x: p.x, y: p.y + 1 },
		{ x: p.x + 1, y: p.y }
	]
}

// Only returns cells in half the directions, so each desired graph edge is counted once.
export function getDiagonalNeighbors(p: Point): Point[] {
	return [
		{ x: p.x, y: p.y + 1 },
		{ x: p.x + 1, y: p.y },
		{ x: p.x + 1, y: p.y + 1 },
		{ x: p.x - 1, y: p.y + 1 }
	]
}

export class UdGraph<T> extends Graph<UdGraph<T>, T> {
	protected construct(...args: GraphArgs<T>): UdGraph<T> {
		return new UdGraph<T>(...args)
	}

	neighbors(v: T): T[] {
		if (!this.vertices.has(v)) {
		return []
		}
	return [
		...this.edges.filter((e) => e[0] === v).map((e) => e[1]),
		...this.edges.filter((e) => e[1] === v).map((e) => e[0])
	]
	}

	connectedComponents(): T[][] {
		const components: T[][] = []
		while (true) {
			const unusedVertex = this.vertices.values().find(v => components.every(component => !component.includes(v)))
			if (!unusedVertex) {
				break
			}
			components.push(this.traverse(unusedVertex))
		}
		return components
	}

	// A graph is Sukoro if no two neighbors have equal degree
	isSukoro(): boolean {
		const map = new Map(this.vertices.values().map<[unknown, number]>(v => [v, this.neighbors(v).length]))
		return this.edges.every(e => map.get(e[0]) !== map.get(e[1]))
	}

	isTree(): boolean {
		return this.connectedComponents().length === 1 && this.vertices.size === 1 + this.edges.length
	}
}

export class DiGraph<T> extends Graph<DiGraph<T>,T> {
	protected construct(...args: GraphArgs<T>): DiGraph<T> {
		return new DiGraph<T>(...args)
	}

	// Here, this is successors
	neighbors(v: T): T[] {
		if (!this.vertices.has(v)) {
		return []
		}
	return [
		...this.edges.filter((e) => e[0] === v).map((e) => e[1])
	]
	}
}
