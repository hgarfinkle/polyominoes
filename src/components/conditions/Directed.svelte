<script lang="ts">
	import { diagonals, directions } from '$lib/point'
	import { isDiagonallyDirected, isOrthogonallyDirected, type Polyomino } from '$lib/polyomino'
	import Condition from './Condition.svelte'

	let { polyomino }: { polyomino: Polyomino } = $props()
</script>

{#each diagonals as diagonal (diagonal)}
	{#if isDiagonallyDirected(polyomino, diagonal)}
		<Condition text={`Diagonally directed: ${diagonal}`} />
	{/if}
{/each}
{#each directions as direction (direction)}
	{#if isOrthogonallyDirected(polyomino, direction)}
		<Condition text={`Orthogonally directed: ${direction}`} />
	{/if}
{/each}
