<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import ImplementationGrid from '$lib/components/ImplementationGrid.svelte';
	import { implementations } from '$lib/data/implementations';
</script>

<svelte:head>
	<title>Projects — Energy Toolkit</title>
	<meta
		name="description"
		content="Live applications built with the Energy Toolkit — across all tools."
	/>
</svelte:head>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Projects</h1>
	<p class="mb-12 max-w-2xl text-lg text-text-dark/70">
		Live applications built with the Energy Toolkit — across all tools.
	</p>

	<ImplementationGrid items={implementations} />
</PageSection>
