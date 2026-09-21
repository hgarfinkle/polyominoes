<script lang="ts">
	import { Tween } from 'svelte/motion';

	let { squareSize, row, column, filled, onClick } = $props();

	const darkness = Tween.of<number>(() => (filled ? 0 : 1), { duration: 50 });
	function handleClick() {
		onClick();
	}
</script>

<rect
	width={squareSize}
	height={squareSize}
	x={row * squareSize}
	y={column * squareSize}
	class="cell"
	onclick={handleClick}
	style={`fill: oklch(${darkness.current} 0 0)`}
/>

<style>
	.cell {
		stroke-width: 1;
		stroke: black;
		cursor: pointer;
	}
</style>
