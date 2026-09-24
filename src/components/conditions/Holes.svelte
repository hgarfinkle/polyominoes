<script lang="ts">
	import { getConnectedComponents, getOrthogonalNeighbors, toGraph } from '$lib/graph';
	import { complementInContainingRectangle, type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let holes = $derived(
		getConnectedComponents(
			toGraph(complementInContainingRectangle(polyomino), getOrthogonalNeighbors)
		).length - 1
	);
</script>

<Condition text={`Holes: ${holes}`} />
