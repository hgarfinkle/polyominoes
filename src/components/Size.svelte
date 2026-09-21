<script lang="ts">
	import { size, type Polyomino } from '$lib/polyomino';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let polyominoSize = $derived(size(polyomino));
</script>

{#if polyominoSize}
	<div>
		{`Size: ${polyominoSize}`}
	</div>
{/if}
