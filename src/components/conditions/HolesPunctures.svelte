<script lang="ts">
	import { getDiagonalNeighbors, getOrthogonalNeighbors, UdGraph } from '$lib/graph'
	import type { Point } from '$lib/point'
	import { complementInContainingRectangle, type Polyomino } from '$lib/polyomino'
	import Condition from './Condition.svelte'

	let { polyomino }: { polyomino: Polyomino } = $props()
	let holes = $derived(
		UdGraph.fromPolyomino<UdGraph<Point>>(
			complementInContainingRectangle(polyomino),
			getOrthogonalNeighbors
		).connectedComponents.length - 1
	)
	let punctures = $derived(
		UdGraph.fromPolyomino<UdGraph<Point>>(
			complementInContainingRectangle(polyomino),
			getDiagonalNeighbors
		).connectedComponents.length - 1
	)
</script>

{#if holes > punctures}
	<Condition text={`Holes: ${holes}`} />
{/if}
{#if punctures > 0}
	<Condition text={`Punctures: ${punctures}`} />
{/if}
