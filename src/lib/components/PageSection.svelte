<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		bg = '',
		children
	}: {
		class?: string;
		bg?: string;
		children: Snippet;
	} = $props();
</script>

<section class="{bg} {className}">
	<div class="mx-auto max-w-6xl px-6 py-16 md:py-24">
		{@render children()}
	</div>
</section>
