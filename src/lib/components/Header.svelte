<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from 'lucide-svelte';

	const navItems = [
		{ name: 'Tools', href: '/tools' },
		{ name: 'Getting Started', href: '/getting-started' },
		{ name: 'Projects', href: '/projects' }
	];

	let mobileOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-50 bg-brand-navy">
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-3 text-white">
			<span class="text-xl font-display font-bold">Energy Toolkit</span>
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-8 md:flex">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-sm font-medium transition-colors {isActive(item.href)
						? 'text-brand-gold'
						: 'text-white/80 hover:text-white'}"
				>
					{item.name}
				</a>
			{/each}
		</div>

		<!-- Mobile toggle -->
		<button
			class="text-white md:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</nav>

	<!-- Mobile nav -->
	{#if mobileOpen}
		<div class="border-t border-white/10 px-6 pb-4 md:hidden">
			{#each navItems as item}
				<a
					href={item.href}
					class="block py-2 text-sm font-medium {isActive(item.href)
						? 'text-brand-gold'
						: 'text-white/80'}"
					onclick={() => (mobileOpen = false)}
				>
					{item.name}
				</a>
			{/each}
		</div>
	{/if}
</header>
