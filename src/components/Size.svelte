<script lang="ts">
	import { size, type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let polyominoSize = $derived(size(polyomino));
</script>

{#if polyominoSize}
	<Condition text={`Size: ${polyominoSize}`}></Condition>
{/if}
