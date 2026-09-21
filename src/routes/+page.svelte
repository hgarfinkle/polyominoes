<script lang="ts">
	import { type Polyomino } from '$lib/polyomino';
	import { makeEmptyBooleanGrid, toPolyomino } from '$lib/booleanGrid';
	import Grid from '../components/Grid.svelte';
	import Size from '../components/Size.svelte';
	import { toGraph } from '$lib/graph';
	import Connected from '../components/Connected.svelte';

	const gridSize = 10;
	let selectedGrid = $state(makeEmptyBooleanGrid(gridSize));
	let asPolyomino = $derived<Polyomino>(toPolyomino(selectedGrid));
	let asGraph = $derived(toGraph(asPolyomino));
</script>

<div class="container">
	<Grid {gridSize} bind:selectedGrid />
	<div class="conditions-container">
		<Size polyomino={asPolyomino} />
		<Connected graph={asGraph} />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}
	.conditions-container {
		margin-left: 1rem;
	}
</style>
