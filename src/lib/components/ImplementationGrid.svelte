<script lang="ts">
	import ImplementationCard from './ImplementationCard.svelte';
	import type { Implementation } from '$lib/data/implementations';

	let { items }: { items: Implementation[] } = $props();
</script>

{#if items.length > 0}
	<div class="grid gap-6 md:grid-cols-2">
		{#each items as implementation (implementation.slug)}
			<ImplementationCard {implementation} />
		{/each}
	</div>
{:else}
	<div class="rounded-xl border border-dashed border-brand-teal/20 bg-brand-cream/30 p-8 text-center">
		<p class="mb-3 text-sm text-text-dark/70">
			No public implementations yet.
		</p>
		<p class="text-xs text-text-dark/50">
			Interested in building one? <a href="mailto:info@toolkit.energy" class="text-link hover:underline">Get in touch</a>.
		</p>
	</div>
{/if}
