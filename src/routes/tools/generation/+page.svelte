<script lang="ts">
	import * as m from '$paraglide/messages';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('tools/generation'));
</script>

<svelte:head>
	<title>{m.page_tools_generation_title()}</title>
	<meta name="description" content={m.page_tools_generation_description()} />
</svelte:head>

<Content />
