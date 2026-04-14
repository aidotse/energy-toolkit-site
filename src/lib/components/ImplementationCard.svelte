<script lang="ts">
	import { ExternalLink, Github } from 'lucide-svelte';
	import * as m from '$paraglide/messages';
	import StatusBadge from './StatusBadge.svelte';
	import type { Implementation } from '$lib/data/implementations';

	let { implementation }: { implementation: Implementation } = $props();
</script>

<article class="group flex flex-col overflow-hidden rounded-xl border border-brand-teal/10 bg-white shadow-sm transition-all hover:border-brand-teal/30 hover:shadow-md">
	<!-- Screenshot or fallback -->
	<div class="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand-navy via-brand-teal to-brand-med-teal">
		{#if implementation.screenshot}
			<img
				src={implementation.screenshot}
				alt="{implementation.displayName} screenshot"
				class="h-full w-full object-cover"
				loading="lazy"
			/>
		{:else}
			<div class="absolute inset-0 flex items-center justify-center">
				<span class="font-display text-2xl font-bold text-white/80">{implementation.displayName}</span>
			</div>
		{/if}
	</div>

	<div class="flex flex-1 flex-col p-5">
		<div class="mb-2 flex items-start justify-between gap-2">
			<div>
				<h3 class="font-display text-lg font-bold text-brand-navy">{implementation.displayName}</h3>
				<p class="text-xs text-text-dark/50">{implementation.org}</p>
			</div>
			<StatusBadge status={implementation.status} />
		</div>

		<p class="mb-4 flex-1 text-sm leading-relaxed text-text-dark/70">
			{implementation.description()}
		</p>

		{#if implementation.tags && implementation.tags.length > 0}
			<div class="mb-4 flex flex-wrap gap-1.5">
				{#each implementation.tags as tag}
					<span class="rounded-full bg-brand-cream px-2.5 py-0.5 text-xs font-medium text-brand-teal">
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<div class="flex flex-wrap gap-3 text-sm">
			{#if implementation.liveUrl}
				<a
					href={implementation.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 font-medium text-brand-teal hover:text-brand-med-teal"
				>
					<ExternalLink size={14} />
					{m.action_view_live_example()}
				</a>
			{/if}
			{#if implementation.repoUrl}
				<a
					href={implementation.repoUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 font-medium text-text-dark/60 hover:text-brand-teal"
				>
					<Github size={14} />
					{m.action_implementation_source()}
				</a>
			{/if}
		</div>
	</div>
</article>
