<script>
	import PageSection from '$lib/components/PageSection.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowRight, Zap } from 'lucide-svelte';
</script>

<!-- Hero -->
<PageSection bg="bg-brand-navy" class="text-white">
	<div class="max-w-3xl">
		<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-1.5 text-sm text-brand-gold">
			<Zap size={14} />
			Open Source
		</div>
		<h1 class="mb-6 text-4xl font-bold leading-tight md:text-6xl">
			Open-source tools for energy forecasting
		</h1>
		<p class="mb-8 text-lg leading-relaxed text-white/70 md:text-xl">
			Energy Toolkit is a collection of open-source tools for creating, sharing, and
			visualizing energy forecasts. Each tool follows the same design philosophy:
			a generator, an API, and an interactive frontend.
		</p>
		<div class="flex flex-wrap gap-4">
			<Button href="/tools" variant="secondary">
				Explore the tools <ArrowRight size={16} />
			</Button>
			<Button href="/projects" variant="ghost">
				<span class="text-white">View live projects</span>
			</Button>
		</div>
	</div>
</PageSection>

<!-- Two tools -->
<PageSection>
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold text-brand-navy">Two tools, one philosophy</h2>
		<p class="mx-auto max-w-2xl text-text-dark/70">
			Each tool is a full-stack application built around the same pattern:
			a Python generator creates scenario data, an API serves it, and a web frontend lets you explore it.
		</p>
	</div>
	<div class="grid gap-6 md:grid-cols-2">
		<FeatureCard
			icon="⚡"
			title="Demand"
			description="Forecast future electricity demand. Generate scenario-based demand projections from historical data, serve them through a REST API, and explore them with interactive charts and maps."
			href="/tools/demand"
		/>
		<FeatureCard
			icon="🌱"
			title="Generation"
			description="Plan renewable capacity. Use PyPSA power system optimization to determine what needs to be built to meet future demand, with weather-informed modeling and scenario exploration."
			href="/tools/generation"
		/>
	</div>
</PageSection>

<!-- Shared architecture -->
<PageSection bg="bg-white">
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold text-brand-navy">Shared design philosophy</h2>
		<p class="mx-auto max-w-2xl text-text-dark/70">
			Both tools follow the same architecture. Fork, plug in your data, and deploy.
		</p>
	</div>
	<div class="mx-auto max-w-3xl space-y-8">
		<div class="flex gap-4">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">1</div>
			<div>
				<h3 class="mb-1 font-display font-bold text-brand-navy">Generator</h3>
				<p class="text-sm text-text-dark/70">A Python engine that creates scenario-based forecast data. Define your models, run the generator, get structured output ready for serving.</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">2</div>
			<div>
				<h3 class="mb-1 font-display font-bold text-brand-navy">API</h3>
				<p class="text-sm text-text-dark/70">A standardized API that serves generated data. Static endpoints for metadata, dynamic queries for time series, fast and flexible.</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">3</div>
			<div>
				<h3 class="mb-1 font-display font-bold text-brand-navy">Frontend</h3>
				<p class="text-sm text-text-dark/70">An interactive web application for exploring the data. Charts, maps, scenario comparison, and export, designed for multiple audiences.</p>
			</div>
		</div>
	</div>
</PageSection>

<!-- CTA -->
<PageSection>
	<div class="text-center">
		<h2 class="mb-4 text-3xl font-bold text-brand-navy">See it in action</h2>
		<p class="mx-auto mb-8 max-w-xl text-text-dark/70">
			Both tools have live reference projects you can explore right now.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<Button href="/projects" variant="primary">
				View projects <ArrowRight size={16} />
			</Button>
			<Button href="/getting-started" variant="ghost">
				Getting started
			</Button>
		</div>
	</div>
</PageSection>
