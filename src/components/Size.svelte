<script lang="ts">
	import { size, type Polyomino } from '$lib';

	let { polyomino }: { polyomino: Polyomino } = $props();
	let polyominoSize = $derived(size(polyomino));
</script>

<div>
	{`Size: ${polyominoSize}`}
</div>
