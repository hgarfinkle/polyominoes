export type Point = { x: number; y: number }
export function add(p1: Point, p2: Point): Point {
	return { x: p1.x + p2.x, y: p1.y + p2.y }
}

export function pEqual(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y
}

export const directions = ['left', 'right', 'up', 'down'] as const

export type Direction = (typeof directions)[number]

export function toLeft(direction: Direction): Direction {
	switch (direction) {
		case 'left':
			return 'down'
		case 'right':
			return 'up'
		case 'up':
			return 'left'
		case 'down':
			return 'right'
		default:
			return direction satisfies never
	}
}

export const diagonals = ['ru', 'rd', 'ld', 'lu'] as const
export type Diagonal = (typeof diagonals)[number]

export function toCoordinateDirectionsDiagonal(diagonal: Diagonal): { x: 'min' | 'max'; y: 'min' | 'max' } {
	switch (diagonal) {
		case 'ru':
			return { x: 'max', y: 'max' }
		case 'rd':
			return { x: 'max', y: 'min' }
		case 'ld':
			return { x: 'min', y: 'min' }
		case 'lu':
			return { x: 'min', y: 'max' }
		default:
			diagonal satisfies never
			return diagonal
	}
}

export function toCoordinateDirections(direction: Direction): {axis: "x" | "y", minMax: "min" | "max"} {
	switch (direction) {
		case "down": return {axis: "y", minMax: "min"}
		case "left": return {axis: "x", minMax: "min"}
		case "right":return {axis: "x", minMax: "max"}
		case "up":return {axis: "y", minMax: "max"}
	}
}

export function diagonalOpposite(diagonal: Diagonal): Diagonal {
	switch (diagonal) {
		case 'ru':
			return 'ld'
		case 'rd':
			return 'lu'
		case 'ld':
			return 'ru'
		case 'lu':
			return 'rd'
		default:
			return diagonal satisfies never
	}
}

export function opposite(direction: Direction): Direction {
	switch (direction) {
		case "down": return "up"
		case "left": return "right"
		case "right": return "left"
		case "up": return "down"
		default: {
			return direction satisfies never
		}
	}
}

export function toCardinalDirections(diagonal: Diagonal): [Direction, Direction] {
	switch (diagonal) {
		case 'ru':
			return ['right', 'up']
		case 'rd':
			return ['right', 'down']
		case 'ld':
			return ['left', 'down']
		case 'lu':
			return ['left', 'up']
		default:
			return diagonal satisfies never
	}
}

export function toMove(direction: Direction): Point {
	switch (direction) {
		case 'left':
			return { x: -1, y: 0 }
		case 'right':
			return { x: 1, y: 0 }
		case 'up':
			return { x: 0, y: 1 }
		case 'down':
			return { x: 0, y: -1 }
	}
}

export function moveInDirection(point: Point, direction: Direction): Point {
	return add(point, toMove(direction))
}

export function neighbors(p: Point): Point[] {
	return directions.map((direction) => moveInDirection(p, direction))
}
