<script lang="ts">
	import { slide } from 'svelte/transition';

	let { text } = $props();
</script>

<div transition:slide>
	{text}
</div>
