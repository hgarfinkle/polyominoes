<script lang="ts">
	import { getOrthogonalNeighbors, UdPointGraph } from '$lib/graph'
	import type { Polyomino } from '$lib/polyomino'
	import Connected from './Connected.svelte'
	import DiagonallyDirected from './DiagonallyDirected.svelte'
	import HolesPunctures from './HolesPunctures.svelte'
	import Perimeter from './Perimeter.svelte'
	import Size from './Size.svelte'

	let { polyomino }: { polyomino: Polyomino } = $props()
	let graph = $derived(UdPointGraph.fromPolyomino(polyomino, getOrthogonalNeighbors))
</script>

<Size {polyomino} />
<Connected {graph} {polyomino} />
<HolesPunctures {polyomino} />
<Perimeter {graph} {polyomino} />
<DiagonallyDirected {polyomino} />
