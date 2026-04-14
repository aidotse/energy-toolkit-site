<script lang="ts">
	import { page } from '$app/state';
	import * as runtime from '$paraglide/runtime';

	const currentLang = $derived(runtime.languageTag());

	// Compute the canonical (locale-stripped, English-slug) path. Paraglide's
	// preprocessor wraps every <a href> in a translateAttribute() call that
	// prepends the locale prefix based on the hreflang attribute — so both
	// the EN and SV links use the SAME canonical path, and Paraglide picks
	// the correct localized URL for each at render time.
	const canonicalPath = $derived.by(() => {
		const p = page.url.pathname;
		const normalized = p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
		if (normalized === '/sv') return '/';
		if (normalized.startsWith('/sv/')) return normalized.slice(3);
		return normalized;
	});
</script>

<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
	<a
		href={canonicalPath}
		class={currentLang === 'en' ? 'text-brand-gold' : 'text-white/70 hover:text-white'}
		aria-current={currentLang === 'en' ? 'page' : undefined}
		hreflang="en"
	>
		EN
	</a>
	<span class="text-white/30">|</span>
	<a
		href={canonicalPath}
		class={currentLang === 'sv' ? 'text-brand-gold' : 'text-white/70 hover:text-white'}
		aria-current={currentLang === 'sv' ? 'page' : undefined}
		hreflang="sv"
	>
		SV
	</a>
</div>
