<script lang="ts">
	import { Github } from 'lucide-svelte';
	import * as m from '$paraglide/messages';
	import StatusBadge from './StatusBadge.svelte';
	import Button from './Button.svelte';
	import type { Framework } from '$lib/data/frameworks';

	let { framework }: { framework: Framework } = $props();
</script>

<div class="rounded-xl border border-brand-teal/10 bg-white p-6 shadow-sm">
	<div class="mb-3 flex flex-wrap items-start justify-between gap-2">
		<h3 class="font-mono text-base font-bold text-brand-navy">{framework.name}</h3>
		<StatusBadge status={framework.status} />
	</div>
	<p class="mb-5 text-sm leading-relaxed text-text-dark/70">{framework.description()}</p>

	{#if framework.repoUrl}
		<div class="flex flex-wrap gap-3">
			<Button href={framework.repoUrl} variant="primary" external>
				<Github size={14} />
				{framework.isTemplate ? m.action_use_this_template() : m.action_view_on_github()}
			</Button>
		</div>
	{:else}
		<div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-text-dark/60">
			{m.framework_empty_hint()}
		</div>
	{/if}
</div>
