<script lang="ts">
	let { gridSize, selectedGrid }: { gridSize: number; selectedGrid: boolean[][] } = $props();

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
			<rect
				width={squareSize}
				height={squareSize}
				x={row * squareSize}
				y={column * squareSize}
				class={['cell', selectedGrid[row][column] ? 'filled' : 'unfilled']}
				onclick={() => {
					selectedGrid[row][column] = !selectedGrid[row][column];
				}}
			/>
		{/each}
	{/each}
</svg>

<style>
	.cell {
		stroke-width: 1;
		stroke: black;
		cursor: pointer;

		&.filled {
			fill: black;
		}

		&.unfilled {
			fill: white;
		}
	}
</style>
