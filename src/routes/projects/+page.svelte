<script lang="ts">
	import * as m from '$paraglide/messages';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('projects'));
</script>

<svelte:head>
	<title>{m.page_projects_title()}</title>
	<meta name="description" content={m.page_projects_description()} />
</svelte:head>

<Content />
