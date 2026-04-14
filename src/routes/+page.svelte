<script lang="ts">
	import * as m from '$paraglide/messages';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { loadPageContent } from '$lib/contentLoader';

	const Content = $derived(loadPageContent('home'));
</script>

<SeoHead title={m.page_home_title()} description={m.page_home_description()} />

<Content />
