<script lang="ts">
	import type { Graph } from '$lib/graph';
	import { getConnectedComponents } from '$lib/graph';
	import type { Point } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { graph }: { graph: Graph<Point> } = $props();
	let numConnectedComponents = $derived(getConnectedComponents(graph).length);
</script>

{#if numConnectedComponents > 0}
	<Condition
		text={numConnectedComponents === 1
			? 'Connected'
			: `Disconnected: there are ${numConnectedComponents} connected components`}
	/>
{/if}
