<script lang="ts">
	import { page } from '$app/state';
	import * as runtime from '$paraglide/runtime';

	let {
		title,
		description,
		ogImage = '/og-image.png'
	}: {
		title: string;
		description: string;
		ogImage?: string;
	} = $props();

	const SITE_URL = 'https://toolkit.energy';

	const lang = $derived(runtime.languageTag());

	// Strip /sv prefix (if present) to get the canonical EN-slug path, then
	// rebuild EN and SV absolute URLs. English slugs in both locales (locked
	// in PLAN_IA / PLAN_I18N) let us use a simple string rewrite here.
	const basePath = $derived.by(() => {
		const p = page.url.pathname;
		const normalized = p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
		if (normalized === '/sv') return '/';
		if (normalized.startsWith('/sv/')) return normalized.slice(3);
		return normalized;
	});

	const enHref = $derived(`${SITE_URL}${basePath}`);
	const svHref = $derived(basePath === '/' ? `${SITE_URL}/sv` : `${SITE_URL}/sv${basePath}`);
	const canonical = $derived(lang === 'sv' ? svHref : enHref);
	const ogLocale = $derived(lang === 'sv' ? 'sv_SE' : 'en_US');
	const ogImageUrl = $derived(`${SITE_URL}${ogImage}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="en" href={enHref} />
	<link rel="alternate" hreflang="sv" href={svHref} />
	<link rel="alternate" hreflang="x-default" href={enHref} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Energy Toolkit" />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImageUrl} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>
