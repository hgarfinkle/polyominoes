<script lang="ts">
	let { squareSize, row, column, filled, onClick } = $props();
</script>

<rect
	width={squareSize}
	height={squareSize}
	x={row * squareSize}
	y={column * squareSize}
	class={['cell', filled ? 'filled' : 'unfilled']}
	onclick={onClick}
/>

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
