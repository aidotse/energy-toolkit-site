<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
</script>

<svelte:head>
	<title>Documentation — Energy Toolkit</title>
</svelte:head>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Documentation</h1>
	<p class="mb-12 max-w-2xl text-lg text-text-dark/70">
		Technical documentation for both Energy Toolkit tools. Architecture, API references,
		deployment guides, and development practices.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<FeatureCard
			icon="⚡"
			title="Demand Documentation"
			description="API reference, explorer architecture, deployment guide, coding standards, debugging guide, and development practices."
			href="/docs/demand"
		/>
		<FeatureCard
			icon="🌱"
			title="Generation Documentation"
			description="Generator architecture, PyPSA model configuration, input data structure, dashboard setup, and deployment."
			href="/docs/generation"
		/>
	</div>
</PageSection>
