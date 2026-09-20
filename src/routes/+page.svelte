<script lang="ts">
	import type { Point, Polyomino } from '$lib';
	import Grid from '../components/Grid.svelte';
	import Size from '../components/Size.svelte';

	const gridSize = 10;
	let selectedGrid = $state(Array<boolean[]>(gridSize).fill(Array<boolean>(gridSize).fill(false)));
	let asPolyomino = $derived<Polyomino>(
		new Set(
			selectedGrid.flatMap((row, rowIdx) =>
				row
					.flatMap((cell, columnIdx) => (cell ? columnIdx : []))
					.map<Point>((columnIdx) => ({ x: columnIdx, y: rowIdx }))
			)
		)
	);
</script>

<Grid {gridSize} {selectedGrid} />
<Size polyomino={asPolyomino} />
