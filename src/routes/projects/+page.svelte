<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<svelte:head>
	<title>Projects — Energy Toolkit</title>
</svelte:head>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Projects</h1>
	<p class="mb-12 max-w-2xl text-lg text-text-dark/70">
		Live applications built with the Energy Toolkit.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<ProjectCard
			title="Behovskartan"
			description="Sweden's energy demand forecast explorer. Visualizes projected electricity demand across regions, sectors, and scenarios through 2050. Built by AI Sweden using the Demand tool."
			href="https://staging.behovskartan.se"
			tags={['Demand', 'SvelteKit', 'AI Sweden', 'Live']}
		/>
		<ProjectCard
			title="PyPSA-VGR"
			description="Renewable capacity planner for Västra Götaland. Uses PyPSA optimization to determine what solar, wind, and storage needs to be built to meet future demand. Built with VGR using the Generation tool."
			href="https://vgr.toolkit.energy"
			tags={['Generation', 'PyPSA', 'Streamlit', 'VGR', 'Live']}
		/>
	</div>
</PageSection>
