<script lang="ts">
	import type { Graph } from '$lib/graph'
	import type { Point } from '$lib/point'
	import { richPerimeter, type Polyomino } from '$lib/polyomino'
	import Condition from './Condition.svelte'

	let { graph, polyomino }: { graph: Graph<Point>; polyomino: Polyomino } = $props()
	let richPerimeterfromPmino = $derived(richPerimeter(polyomino))
</script>

<Condition text={`Perimeter: ${4 * graph.vertices.size - 2 * graph.edges.length}`} />
<Condition text={JSON.stringify(richPerimeterfromPmino)} />
