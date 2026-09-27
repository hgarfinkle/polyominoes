export type Point = { x: number; y: number; };export function add(p1: Point, p2: Point): Point {
    return { x: p1.x + p2.x, y: p1.y + p2.y };
}

export const directions = ['left', 'right', 'up', 'down'] as const

export type Direction = (typeof directions)[number]

export const diagonals = ['ru', 'rd', 'ld', 'lu'] as const
export type Diagonal = (typeof diagonals)[number]

export function toCoordinateDirections(diagonal: Diagonal): { x: 'min' | 'max'; y: 'min' | 'max'; } {
    switch (diagonal) {
        case 'ru':
            return { x: 'max', y: 'max' };
        case 'rd':
            return { x: 'max', y: 'min' };
        case 'ld':
            return { x: 'min', y: 'min' };
        case 'lu':
            return { x: 'min', y: 'max' };
        default:
            diagonal satisfies never;
            return diagonal;
    }
}

export function opposite(diagonal: Diagonal): Diagonal {
    switch (diagonal) {
        case 'ru':
            return 'ld';
        case 'rd':
            return 'lu';
        case 'ld':
            return 'ru';
        case 'lu':
            return 'rd';
        default:
            diagonal satisfies never;
            return diagonal;
    }
}

export function toCardinalDirections(diagonal: Diagonal): [Direction, Direction] {
    switch (diagonal) {
        case 'ru':
            return ['right', 'up'];
        case 'rd':
            return ['right', 'down'];
        case 'ld':
            return ['left', 'down'];
        case 'lu':
            return ['left', 'up'];
        default:
            diagonal satisfies never;
            return diagonal;
    }
}

export function toMove(direction: Direction): Point {
    switch (direction) {
        case 'left':
            return { x: -1, y: 0 };
        case 'right':
            return { x: 1, y: 0 };
        case 'up':
            return { x: 0, y: 1 };
        case 'down':
            return { x: 0, y: -1 };
    }
}

export function moveInDirection(point: Point, direction: Direction): Point {
    return add(point, toMove(direction));
}

export function neighbors(p: Point): Point[] {
    return [
        { x: p.x + 1, y: p.y },
        { x: p.x - 1, y: p.y },
        { x: p.x, y: p.y + 1 },
        { x: p.x, y: p.y - 1 }
    ];
}
