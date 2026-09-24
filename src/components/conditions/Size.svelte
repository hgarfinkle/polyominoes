<script lang="ts">
	import { type Polyomino } from '$lib/polyomino';
	import Condition from './Condition.svelte';

	let { polyomino }: { polyomino: Polyomino } = $props();
</script>

<Condition text={`Size: ${polyomino.size}`}></Condition>
