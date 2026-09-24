<script lang="ts">
	import { slide } from 'svelte/transition';

	let { text }: { text: string } = $props();
</script>

<div transition:slide|global>
	{text}
</div>
