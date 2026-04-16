<script>
	import PageSection from '$lib/components/PageSection.svelte';
	import ImplementationGrid from '$lib/components/ImplementationGrid.svelte';
	import { implementations } from '$lib/data/implementations';
</script>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Projekt</h1>
	<p class="mb-12 max-w-2xl text-lg text-text-dark/70">
		Live-applikationer byggda med Energy Toolkit, över alla verktyg.
	</p>

	<ImplementationGrid items={implementations} />
</PageSection>
