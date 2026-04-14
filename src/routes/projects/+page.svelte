<script lang="ts">
	import * as m from '$paraglide/messages';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('projects'));
</script>

<SeoHead title={m.page_projects_title()} description={m.page_projects_description()} />

<Content />
