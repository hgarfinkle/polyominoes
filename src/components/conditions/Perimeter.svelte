<script lang="ts">
	import type { UdGraph } from '$lib/graph'
	import type { Point } from '$lib/point'
	import { richPerimeter, type Polyomino } from '$lib/polyomino'
	import Condition from './Condition.svelte'

	let { graph, polyomino }: { graph: UdGraph<Point>; polyomino: Polyomino } = $props()
	let richPerimeterfromPmino = $derived(richPerimeter(polyomino))
</script>

<Condition text={`Perimeter: ${4 * graph.order - 2 * graph.size}`} />
<Condition text={JSON.stringify(richPerimeterfromPmino)} />
