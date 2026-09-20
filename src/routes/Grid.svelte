<script>
	const squareSize = 50;
	const gridSize = 10;

	let selectedGrid = $state(Array(gridSize).fill(Array(gridSize).fill(false)));
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

		&.filled {
			fill: black;
		}

		&.unfilled {
			fill: white;
		}
	}
</style>
