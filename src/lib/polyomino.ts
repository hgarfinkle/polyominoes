import { PointDiGraph } from './graph';
import { HashSet } from './hashSet'
import {
	type Diagonal,
	moveInDirection,
	opposite,
	toCardinalDirections,
	toCoordinateDirections,
	type Point,
	neighbors,
	type Direction,
	directions,
    toLeft,
    pEqual,
    diagonalOpposite,
    toCoordinateDirectionsDiagonal
} from './point'

export type Polyomino = HashSet<Point>

function dimensions(pmino: Polyomino) {
	let minX = Infinity
	let minY = Infinity
	let maxX = -Infinity
	let maxY = -Infinity
	pmino.values().forEach((point) => {
		minX = Math.min(minX, point.x)
		minY = Math.min(minY, point.y)
		maxX = Math.max(maxX, point.x)
		maxY = Math.max(maxY, point.y)
	})
	return { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } }
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

function getBoundaryEdges(pmino: Polyomino): { in: Point; out: Point; direction: Direction }[] {
	return [...pmino.values()].flatMap((cell) =>
		directions
			.filter((direction) => {
				const candidate = moveInDirection(cell, direction)
				return !pmino.has(candidate)
			})
			.map((direction) => ({
				in: cell,
				out: moveInDirection(cell, direction),
                // by convention, the direction of this edge puts the inside cell on the left
				direction: toLeft(direction)
			}))
	)
}

function gridAroundPolyomino(pmino: Polyomino): Polyomino {
	const gridPolyomino = new HashSet<Point>()
	const dims = dimensions(pmino)
	for (let i = dims.x.min - 1; i <= dims.x.max + 1; i++) {
		for (let j = dims.y.min - 1; j <= dims.y.max + 1; j++) {
			gridPolyomino.add({ x: i, y: j })
		}
	}
	return gridPolyomino
}

export function complementInContainingRectangle(pmino: Polyomino) {
	const grid = gridAroundPolyomino(pmino)
	return grid.setDifference(pmino)
}

export function isDiagonallyDirected(pmino: Polyomino, diagonal: Diagonal): boolean {
	const root = getRoot(pmino, diagonalOpposite(diagonal))
	return pmino
		.values()
		.every(
			(point) =>
				point === root ||
				toCardinalDirections(diagonalOpposite(diagonal)).some((direction) =>
					pmino.has(moveInDirection(point, direction))
				)
		)
}

export function isOrthogonallyDirected(pmino: Polyomino, direction: Direction): boolean {
	// find _some_ cell on the required edge
	const dims = dimensions(pmino)
	const asCoordinateDirections = toCoordinateDirections(opposite(direction))
	const root = pmino.values().find(cell => cell[asCoordinateDirections.axis] === dims[asCoordinateDirections.axis][asCoordinateDirections.minMax])
	if (!root) {
		return false
	}

	const directionsOfTravel = directions.filter(dir => dir !== opposite(direction))
	const diGraph = PointDiGraph.fromPolyomino(pmino, p => directionsOfTravel.map(dir => moveInDirection(p, dir)))
	return diGraph.traverse(root).length === pmino.size
}

// A cell can only be a root candidate if it is in the corner of the pmino's bounding box
function getRoot(pmino: Polyomino, direction: Diagonal): Point | undefined {
	const dims = dimensions(pmino)
	const asCoordinateDirections = toCoordinateDirectionsDiagonal(direction)
	return pmino.get({ x: dims.x[asCoordinateDirections.x], y: dims.y[asCoordinateDirections.y] })
}

// TODO this algo's a piece a crap
export function richPerimeter(pmino: Polyomino): Direction[][] {
	// get a list of edges between points in P and points not in P
	const boundaryEdges = getBoundaryEdges(pmino)
    // const seen: ReturnType<typeof getBoundaryEdges> = []
    const components: Direction[][] = []
    const map = new Map<ReturnType<typeof getBoundaryEdges>[number], ReturnType<typeof getBoundaryEdges>[number]>();
    boundaryEdges.forEach(boundaryEdge => {
        // try to turn left
        const leftCandidate = boundaryEdges.find(candidate => candidate.in === boundaryEdge.in && candidate.direction === toLeft(boundaryEdge.direction))
        if (leftCandidate) {
            map.set(boundaryEdge, leftCandidate)
            return
        }
        // try to go straight
        const straightCandidate = boundaryEdges.find(candidate => pEqual(candidate.in, moveInDirection(boundaryEdge.in, boundaryEdge.direction)) && candidate.direction === boundaryEdge.direction)
        if (straightCandidate) {
            map.set(boundaryEdge, straightCandidate)
            return
        }
        // try to turn right
        const rightCandidate = boundaryEdges.find(candidate => pEqual(candidate.out, boundaryEdge.out) && toLeft(candidate.direction) === boundaryEdge.direction)
        if (rightCandidate) {
            map.set(boundaryEdge, rightCandidate)
            return
        }
        throw new Error("failed to find successor boundary edge")
    })
    while (map.size > 0) {
        // find lowest leftest rightward segment
        const lowerRightmostEdge = map.values().filter(boundaryEdge => boundaryEdge.direction === "right")
            .reduce((previous, next) => (previous.in.y < next.in.y || (previous.in.y === next.in.y && previous.in.x < next.in.x)) ? previous : next)
        const component: Direction[] = []
        let next: ReturnType<typeof getBoundaryEdges>[number] | undefined = lowerRightmostEdge
        while (next !== undefined) {
            component.push(next.direction)
            const previous = next
            next = map.get(next)
            map.delete(previous)
        }
        component.pop()
        components.push(component)
    }
	return components
}
