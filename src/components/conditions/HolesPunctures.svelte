<script lang="ts">
	import { getDiagonalNeighbors, getOrthogonalNeighbors, UdPointGraph } from '$lib/graph'
	import { complementInContainingRectangle, type Polyomino } from '$lib/polyomino'
	import Condition from './Condition.svelte'

	let { polyomino }: { polyomino: Polyomino } = $props()
	let holes = $derived(
		UdPointGraph.fromPolyomino(complementInContainingRectangle(polyomino), getOrthogonalNeighbors)
			.connectedComponents.length - 1
	)
	let punctures = $derived(
		UdPointGraph.fromPolyomino(complementInContainingRectangle(polyomino), getDiagonalNeighbors)
			.connectedComponents.length - 1
	)
</script>

{#if holes > punctures}
	<Condition text={`Holes: ${holes}`} />
{/if}
{#if punctures > 0}
	<Condition text={`Punctures: ${punctures}`} />
{/if}
