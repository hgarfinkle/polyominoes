import { HashSet } from './hashSet';
import { type Diagonal, moveInDirection, opposite, toCardinalDirections, toCoordinateDirections, type Point, neighbors } from './point';

export type Polyomino = HashSet<Point>;

function dimensions(pmino: Polyomino) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	pmino.values().forEach((point) => {
		minX = Math.min(minX, point.x);
		minY = Math.min(minY, point.y);
		maxX = Math.max(maxX, point.x);
		maxY = Math.max(maxY, point.y);
	});
	return { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } };
}

// TODO use or remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function polyominoNeighbors(polyomino: Polyomino): HashSet<Point> {
	const visited = new HashSet<Point>();
	for (const cell of polyomino.values()) {
		for (const neighbor of neighbors(cell)) {
			if (!polyomino.has(neighbor) && !visited.has(neighbor)) {
				visited.add(neighbor);
			}
		}
	}
	return visited;
}

function gridAroundPolyomino(pmino: Polyomino): Polyomino {
	const gridPolyomino = new HashSet<Point>();
	const dims = dimensions(pmino);
	for (let i = dims.x.min - 1; i <= dims.x.max + 1; i++) {
		for (let j = dims.y.min - 1; j <= dims.y.max + 1; j++) {
			gridPolyomino.add({ x: i, y: j });
		}
	}
	return gridPolyomino;
}

export function complementInContainingRectangle(pmino: Polyomino) {
	const grid = gridAroundPolyomino(pmino);
	return grid.setDifference(pmino);
}

export function isDiagonallyDirected(pmino: Polyomino, diagonal: Diagonal): boolean {
	const root = getRoot(pmino, opposite(diagonal));
	return pmino
		.values()
		.every(
			(point) =>
				point === root ||
				toCardinalDirections(opposite(diagonal)).some((direction) =>
					pmino.has(moveInDirection(point, direction))
				)
		);
}

// A cell can only be an root candidate if it is in the corner of the pmino's bounding box
function getRoot(pmino: Polyomino, direction: Diagonal): Point | undefined {
	const dims = dimensions(pmino);
	const asCoordinateDirections = toCoordinateDirections(direction);
	return pmino.get({ x: dims.x[asCoordinateDirections.x], y: dims.y[asCoordinateDirections.y] });
}
