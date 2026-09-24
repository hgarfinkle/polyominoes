<script lang="ts">
	import { getConnectedComponents, getDiagonalNeighbors, toGraph } from '$lib/graph';
	import { complementInContainingRectangle, type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let punctures = $derived(
		getConnectedComponents(
			toGraph(complementInContainingRectangle(polyomino), getDiagonalNeighbors)
		).length - 1
	);
</script>

<Condition text={`Punctures: ${punctures}`} />
