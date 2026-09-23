<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import 'sanitize.css';
	import './styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
