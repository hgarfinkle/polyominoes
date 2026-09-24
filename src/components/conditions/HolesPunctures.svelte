<script lang="ts">
	import {
		getConnectedComponents,
		getDiagonalNeighbors,
		getOrthogonalNeighbors,
		toGraph
	} from '$lib/graph';
	import { complementInContainingRectangle, type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let holes = $derived(
		getConnectedComponents(
			toGraph(complementInContainingRectangle(polyomino), getOrthogonalNeighbors)
		).length - 1
	);
	let punctures = $derived(
		getConnectedComponents(
			toGraph(complementInContainingRectangle(polyomino), getDiagonalNeighbors)
		).length - 1
	);
</script>

{#if holes > punctures}
	<Condition text={`Holes: ${holes}`} />
{/if}
{#if punctures > 0}
	<Condition text={`Punctures: ${punctures}`} />
{/if}
