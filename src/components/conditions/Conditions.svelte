<script lang="ts">
	import { getOrthogonalNeighbors, toGraph } from '$lib/graph';
	import type { Polyomino } from '$lib/polyomino';
	import Connected from './Connected.svelte';
	import HolesPunctures from './HolesPunctures.svelte';
	import Size from './Size.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let graph = $derived(toGraph(polyomino, getOrthogonalNeighbors));
</script>

<Size {polyomino} />
<Connected {graph} {polyomino} />
<HolesPunctures {polyomino} />
