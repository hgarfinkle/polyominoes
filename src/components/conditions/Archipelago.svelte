<script lang="ts">
	import { getConnectedComponents, getDiagonalNeighbors, toGraph } from '$lib/graph';
	import type { Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let {
		polyomino,
		numOrthogonallyConnectedComponents
	}: { polyomino: Polyomino; numOrthogonallyConnectedComponents: number } = $props();
	let numArchipelagos = $derived(
		getConnectedComponents(toGraph(polyomino, getDiagonalNeighbors)).length
	);
</script>

{#if numArchipelagos < numOrthogonallyConnectedComponents}
	<Condition
		text={numArchipelagos === 1
			? 'Diagonally connected'
			: `Diagonally disconnected: there are ${numArchipelagos} archipelagos`}
	/>
{/if}
