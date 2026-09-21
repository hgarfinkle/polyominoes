<script lang="ts">
	import GridSquare from './GridSquare.svelte';

	let { gridSize, selectedGrid = $bindable() }: { gridSize: number; selectedGrid: boolean[][] } =
		$props();

	const squareSize = 50;
</script>

<svg width={squareSize * gridSize} height={squareSize * gridSize} overflow="visible">
	<rect
		width={squareSize * gridSize}
		height={squareSize * gridSize}
		style="fill:white;stroke-width:4;stroke:black"
	/>
	{#each { length: gridSize }, row}
		{#each { length: gridSize }, column}
			<GridSquare
				{squareSize}
				{row}
				{column}
				filled={selectedGrid[row][column]}
				onClick={() => {
					selectedGrid[row][column] = !selectedGrid[row][column];
				}}
			/>
		{/each}
	{/each}
</svg>
