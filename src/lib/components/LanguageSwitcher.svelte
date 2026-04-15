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

	// Record the user's explicit choice synchronously before navigation so
	// app.html's first-visit auto-detect respects it on the next load.
	function setLangPreference(lang: 'en' | 'sv') {
		document.cookie = `lang_preference=${lang}; path=/; max-age=31536000; samesite=lax`;
	}
</script>

<!--
	data-sveltekit-reload forces a full page navigation (not a client-side
	transition). Necessary because Paraglide's runtime language tag is set
	server-side in hooks.server.ts; a SvelteKit client navigation changes
	the URL but doesn't re-run the handle hook, so the locale would not
	flip. A full reload fetches the prerendered page for the target locale
	with the correct lang baked in.
-->
<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
	<a
		href={canonicalPath}
		class={currentLang === 'en' ? 'text-brand-gold' : 'text-white/70 hover:text-white'}
		aria-current={currentLang === 'en' ? 'page' : undefined}
		hreflang="en"
		data-sveltekit-reload
		onclick={() => setLangPreference('en')}
	>
		EN
	</a>
	<span class="text-white/30">|</span>
	<a
		href={canonicalPath}
		class={currentLang === 'sv' ? 'text-brand-gold' : 'text-white/70 hover:text-white'}
		aria-current={currentLang === 'sv' ? 'page' : undefined}
		hreflang="sv"
		data-sveltekit-reload
		onclick={() => setLangPreference('sv')}
	>
		SV
	</a>
</div>
