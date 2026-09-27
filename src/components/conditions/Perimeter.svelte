<script lang="ts">
	import type { Graph } from '$lib/graph';
	import type { Point } from '$lib/point';
	import Condition from './Condition.svelte';

	let { graph }: { graph: Graph<Point> } = $props();
</script>

<Condition text={`Perimeter: ${4 * graph.vertices.size - 2 * graph.edges.length}`} />
