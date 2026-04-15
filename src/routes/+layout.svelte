<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import * as runtime from '$paraglide/runtime';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Persist the active locale so future visits to / respect the choice
	// made via direct URL navigation (bookmarks, shared links, deep links).
	// The language switcher sets the same cookie synchronously on click
	// for the explicit-choice case.
	$effect(() => {
		const lang = runtime.languageTag();
		document.cookie = `lang_preference=${lang}; path=/; max-age=31536000; samesite=lax`;
	});
</script>

<ParaglideJS {i18n}>
	<div class="flex min-h-screen flex-col">
		<Header />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
</ParaglideJS>
