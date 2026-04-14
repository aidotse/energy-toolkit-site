<script lang="ts">
	import * as m from '$paraglide/messages';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('home'));
</script>

<svelte:head>
	<title>{m.page_home_title()}</title>
	<meta name="description" content={m.page_home_description()} />
</svelte:head>

<Content />
