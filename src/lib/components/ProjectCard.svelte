<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	let {
		title,
		description,
		href,
		tags = []
	}: {
		title: string;
		description: string;
		href: string;
		tags?: string[];
	} = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group block rounded-xl border border-brand-teal/10 bg-white p-6 shadow-sm transition-all hover:border-brand-teal/30 hover:shadow-md"
>
	<div class="mb-3 flex items-start justify-between">
		<h3 class="text-lg font-display font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
			{title}
		</h3>
		<ExternalLink size={16} class="mt-1 text-text-dark/30 group-hover:text-brand-teal transition-colors" />
	</div>
	<p class="mb-4 text-sm leading-relaxed text-text-dark/70">{description}</p>
	{#if tags.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each tags as tag}
				<span class="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-teal">{tag}</span>
			{/each}
		</div>
	{/if}
</a>
