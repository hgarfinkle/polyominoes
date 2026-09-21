import type { Point, Polyomino } from "$lib/polyomino";
import { HashSet } from "./hashSet";

export function makeEmptyBooleanGrid(size: number) {
    return Array<boolean[]>(size).fill(Array<boolean>(size).fill(false))
}

export function toPolyomino(grid: boolean[][]): Polyomino {
    return new HashSet(
			grid.flatMap((row, rowIdx) =>
				row
					.flatMap((cell, columnIdx) => (cell ? columnIdx : []))
					.map<Point>((columnIdx) => ({ x: columnIdx, y: rowIdx }))
			)
		)
}