<script lang="ts">
	import * as m from '$paraglide/messages';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('tools/demand'));
</script>

<svelte:head>
	<title>{m.page_tools_demand_title()}</title>
	<meta name="description" content={m.page_tools_demand_description()} />
</svelte:head>

<Content />
