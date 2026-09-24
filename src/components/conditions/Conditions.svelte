<script lang="ts">
	import { getOrthogonalNeighbors, toGraph } from '$lib/graph';
	import type { Polyomino } from '$lib/polyomino';
	import Archipelago from './Archipelago.svelte';
	import Connected from './Connected.svelte';
	import Holes from './Holes.svelte';
	import Punctures from './Punctures.svelte';
	import Size from './Size.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let asGraph = $derived(toGraph(polyomino, getOrthogonalNeighbors));
</script>

<Size {polyomino} />
<Connected graph={asGraph} />
<Holes {polyomino} />
<Punctures {polyomino} />
<Archipelago {polyomino} />
