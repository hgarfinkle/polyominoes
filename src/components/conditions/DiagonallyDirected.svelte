<script lang="ts">
	import { diagonals } from '$lib/point';
	import { isDiagonallyDirected, type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
</script>

{#each diagonals as diagonal (diagonal)}
	{#if isDiagonallyDirected(polyomino, diagonal)}
		<Condition text={`Diagonally directed: ${diagonal}`} />
	{/if}
{/each}
