<script lang="ts">
	import { getConnectedComponents, getDiagonalNeighbors, toGraph } from '$lib/graph';
	import type { Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let numArchipelagos = $derived(
		getConnectedComponents(toGraph(polyomino, getDiagonalNeighbors)).length
	);
</script>

<Condition
	text={numArchipelagos === 1
		? 'Diagonally connected'
		: `Diagonally disconnected: there are ${numArchipelagos} archipelagos`}
/>
