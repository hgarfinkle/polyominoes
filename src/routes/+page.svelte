<script lang="ts">
	import { type Polyomino } from '$lib/polyomino';
	import { makeEmptyBooleanGrid, toPolyomino } from '$lib/booleanGrid';
	import Grid from '../components/Grid.svelte';
	import Size from '../components/Size.svelte';
	import { toGraph } from '$lib/graph';
	import Connected from '../components/Connected.svelte';
	import Holes from '../components/Holes.svelte';

	const gridSize = 10;
	let selectedGrid = $state(makeEmptyBooleanGrid(gridSize));
	let polyomino = $derived<Polyomino>(toPolyomino(selectedGrid));
	let asGraph = $derived(toGraph(polyomino));
</script>

<div class="container">
	<div class="grid-container">
		<Grid {gridSize} bind:selectedGrid />
	</div>
	<div class="conditions-container">
		{#if polyomino.size}
			<Size {polyomino} />
			<Connected graph={asGraph} />
			<Holes {polyomino} />
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		width: 100dvw;
		height: 100dvh;
		background-color: var(--background);
	}
	.conditions-container {
		margin-left: 1rem;
	}

	.grid-container {
		margin: 2rem;
	}
</style>
