<script lang="ts">
	import GridSquare from './GridSquare.svelte';

	let { gridSize, selectedGrid = $bindable() }: { gridSize: number; selectedGrid: boolean[][] } =
		$props();

	const squareSize = 50;
</script>

<svg width={squareSize * gridSize} height={squareSize * gridSize} overflow="visible">
	<rect width={squareSize * gridSize} height={squareSize * gridSize} class="grid-border" />
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

<style>
	.grid-border {
		fill-opacity: 0;
		stroke-width: 4;
		stroke: var(--primary);
	}
</style>
