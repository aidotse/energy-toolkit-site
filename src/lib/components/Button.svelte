<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href = '',
		variant = 'primary',
		external = false,
		children
	}: {
		href?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
		external?: boolean;
		children: Snippet;
	} = $props();

	const base = 'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all';
	const variants = {
		primary: 'bg-brand-teal text-white hover:bg-brand-med-teal',
		secondary: 'bg-brand-gold text-brand-navy hover:bg-brand-gold/80',
		ghost: 'border border-brand-teal/20 text-brand-teal hover:border-brand-teal/40 hover:bg-brand-teal/5'
	};
</script>

{#if href}
	<a
		{href}
		class="{base} {variants[variant]}"
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		{@render children()}
	</a>
{:else}
	<button class="{base} {variants[variant]}">
		{@render children()}
	</button>
{/if}
