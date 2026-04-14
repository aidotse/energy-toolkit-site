<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from 'lucide-svelte';
	import * as m from '$paraglide/messages';
	import { i18n } from '$lib/i18n';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	const navItems = [
		{ nameFn: m.nav_tools, href: '/tools' },
		{ nameFn: m.nav_getting_started, href: '/getting-started' },
		{ nameFn: m.nav_projects, href: '/projects' }
	];

	let mobileOpen = $state(false);

	function isActive(href: string): boolean {
		// Compare against the canonical (locale-stripped) pathname so that
		// /sv/tools still activates the Tools nav item.
		const canonical = i18n.route(page.url.pathname);
		if (href === '/') return canonical === '/';
		return canonical.startsWith(href);
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
					{item.nameFn()}
				</a>
			{/each}
			<LanguageSwitcher />
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
					{item.nameFn()}
				</a>
			{/each}
			<div class="pt-3">
				<LanguageSwitcher />
			</div>
		</div>
	{/if}
</header>
