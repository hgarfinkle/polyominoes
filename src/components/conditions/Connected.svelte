<script lang="ts">
	import type { Graph } from '$lib/graph';
	import { getConnectedComponents } from '$lib/graph';
	import type { Point, Polyomino } from '$lib/polyomino';
	import Archipelago from './Archipelago.svelte';
	import Condition from './Condition.svelte';

	let { graph, polyomino }: { graph: Graph<Point>; polyomino: Polyomino } = $props();
	let numConnectedComponents = $derived(getConnectedComponents(graph).length);
</script>

<Condition
	text={numConnectedComponents === 1
		? 'Connected'
		: `Disconnected: there are ${numConnectedComponents} connected components`}
/>
{#if numConnectedComponents > 1}
	<Archipelago {polyomino} numOrthogonallyConnectedComponents={numConnectedComponents} />
{/if}
