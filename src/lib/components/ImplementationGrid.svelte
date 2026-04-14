<script lang="ts">
	import * as m from '$paraglide/messages';
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
			{m.implementations_empty_primary()}
		</p>
		<p class="text-xs text-text-dark/50">
			{m.implementations_empty_secondary()}
			<a href="mailto:info@toolkit.energy" class="text-link hover:underline">
				{m.implementations_empty_cta()}
			</a>.
		</p>
	</div>
{/if}
