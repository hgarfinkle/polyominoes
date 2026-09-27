<script lang="ts">
	let { squareSize, row, column, filled, onClick } = $props()

	function handleClick() {
		onClick()
	}
</script>

<rect
	width={squareSize}
	height={squareSize}
	x={column * squareSize}
	y={row * squareSize}
	class={['cell', filled ? 'filled' : 'empty']}
	onclick={handleClick}
/>

<style>
	.cell {
		stroke-width: 1;
		stroke: var(--primary);
		cursor: pointer;
		transition: fill 0.2s ease;
	}

	.filled {
		fill: var(--primary);
	}

	.empty {
		fill: transparent;
	}
</style>
