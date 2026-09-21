<script lang="ts">
	import type { Graph } from '$lib/graph';
	import { isConnected } from '$lib/graph';
	import type { Point } from '$lib/polyomino';

	let { graph }: { graph: Graph<Point> } = $props();
	let isGraphConnected = $derived(isConnected(graph));
</script>

{#if isGraphConnected}
	<div>Connected</div>
{/if}
