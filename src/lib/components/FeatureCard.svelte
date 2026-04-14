<script lang="ts">
	let {
		title,
		description,
		href,
		icon = ''
	}: {
		title: string;
		description: string;
		href: string;
		icon?: string;
	} = $props();
</script>

<a
	{href}
	class="group block rounded-xl border border-brand-teal/10 bg-white p-6 shadow-sm transition-all hover:border-brand-teal/30 hover:shadow-md"
>
	{#if icon}
		<div class="mb-3 text-2xl">{icon}</div>
	{/if}
	<h3 class="mb-2 text-lg font-display font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
		{title}
	</h3>
	<p class="text-sm leading-relaxed text-text-dark/70">{description}</p>
</a>
