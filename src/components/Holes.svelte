<script lang="ts">
	import { getConnectedComponents, toGraph } from '$lib/graph';
	import { complementInContainingRectangle, type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let holes = $derived(
		getConnectedComponents(toGraph(complementInContainingRectangle(polyomino))).length - 1
	);
</script>

<Condition text={`Holes: ${holes}`} />
