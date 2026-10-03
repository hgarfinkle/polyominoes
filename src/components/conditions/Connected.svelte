<script lang="ts">
	import type { Polyomino } from '$lib/polyomino'
	import Archipelago from './Archipelago.svelte'
	import Condition from './Condition.svelte'
	import type { UdPointGraph } from '$lib/graph'

	let { graph, polyomino }: { graph: UdPointGraph; polyomino: Polyomino } = $props()
	let numConnectedComponents = $derived(graph.connectedComponents.length)
</script>

<Condition
	text={numConnectedComponents === 1
		? 'Connected'
		: `Disconnected: there are ${numConnectedComponents} connected components`}
/>
{#if numConnectedComponents > 1}
	<Archipelago {polyomino} numOrthogonallyConnectedComponents={numConnectedComponents} />
{/if}
