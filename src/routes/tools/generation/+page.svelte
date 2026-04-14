<script lang="ts">
	import * as m from '$paraglide/messages';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('tools/generation'));
</script>

<SeoHead title={m.page_tools_generation_title()} description={m.page_tools_generation_description()} />

<Content />
