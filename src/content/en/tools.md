<script>
	import PageSection from '$lib/components/PageSection.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowRight } from 'lucide-svelte';
</script>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Tools</h1>
	<p class="mb-12 max-w-2xl text-lg text-text-dark/70">
		Energy Toolkit provides two tools for energy forecasting. Both follow the same
		design philosophy — a Python generator, a data API, and an interactive web frontend —
		but address different questions about the energy system.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<FeatureCard
			icon="⚡"
			title="Demand"
			description="How much electricity will we need? Scenario-based demand projections from historical data, with interactive charts and geographic maps."
			href="/tools/demand"
		/>
		<FeatureCard
			icon="🌱"
			title="Generation"
			description="What do we need to build? PyPSA-based optimization to plan renewable capacity — solar, wind, storage — with weather-informed modeling."
			href="/tools/generation"
		/>
	</div>
</PageSection>

<!-- Shared architecture -->
<PageSection bg="bg-white">
	<h2 class="mb-4 text-2xl font-bold text-brand-navy">Shared design philosophy</h2>
	<p class="mb-8 max-w-3xl text-text-dark/70">
		Both tools are built around the same three-layer architecture. This isn't incidental —
		it's a deliberate design choice that makes each tool independently forkable, deployable,
		and customizable while sharing a common mental model.
	</p>

	<div class="grid gap-8 md:grid-cols-3">
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<h3 class="mb-2 font-display font-bold text-brand-navy">Generator</h3>
			<p class="mb-3 text-sm text-text-dark/70">
				A Python engine that takes input data and configuration, runs a model, and produces
				structured output. The generator is the only part that needs domain expertise.
			</p>
			<ul class="space-y-1 text-xs text-text-dark/50">
				<li><strong>Demand:</strong> Historical data + transformations → Parquet</li>
				<li><strong>Generation:</strong> Weather + demand + PyPSA → capacity plans</li>
			</ul>
		</div>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<h3 class="mb-2 font-display font-bold text-brand-navy">API</h3>
			<p class="mb-3 text-sm text-text-dark/70">
				A data layer that serves generator output through standardized endpoints.
				Static JSON for metadata, dynamic queries for time series and scenario data.
			</p>
			<ul class="space-y-1 text-xs text-text-dark/50">
				<li><strong>Demand:</strong> OpenAPI 3.1 + DuckDB on Parquet</li>
				<li><strong>Generation:</strong> File-based API (local or HTTP server)</li>
			</ul>
		</div>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<h3 class="mb-2 font-display font-bold text-brand-navy">Frontend</h3>
			<p class="mb-3 text-sm text-text-dark/70">
				An interactive web application for exploring the data. Charts, maps, scenario
				comparison — designed for multiple audiences from the public to domain experts.
			</p>
			<ul class="space-y-1 text-xs text-text-dark/50">
				<li><strong>Demand:</strong> SvelteKit + LayerChart + Mapbox GL</li>
				<li><strong>Generation:</strong> Streamlit + Plotly + Folium</li>
			</ul>
		</div>
	</div>
</PageSection>

<!-- Flexibility -->
<PageSection>
	<h2 class="mb-4 text-2xl font-bold text-brand-navy">Designed to be forked</h2>
	<p class="mb-8 max-w-3xl text-text-dark/70">
		The tools are not SaaS products — they're starting points. Fork a repo, swap in your
		own data and models, and deploy. The architecture is designed to make this straightforward.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<div>
			<h3 class="mb-3 font-display font-bold text-brand-navy">Flexible inputs</h3>
			<ul class="space-y-3 text-sm text-text-dark/70">
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Any region</strong> — Provide your own GeoJSON boundaries and demand data. The Demand tool ships with Swedish data; adapt it for your country or region.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Any scenario model</strong> — The generators are modular. Replace the transformation functions with your own forecasting models while keeping the data pipeline intact.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Configuration-driven</strong> — Scenarios, geographies, segments, and parameters are defined in config files (YAML or JSON). Change the config, regenerate, and the entire stack updates.</span>
				</li>
			</ul>
		</div>
		<div>
			<h3 class="mb-3 font-display font-bold text-brand-navy">Flexible deployment</h3>
			<ul class="space-y-3 text-sm text-text-dark/70">
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Run locally</strong> — Both tools work on a laptop with no cloud services. Good for development and internal use.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Deploy to the cloud</strong> — Both tools run on any standard cloud platform. Bring your own infrastructure; the tools have no vendor lock-in.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Static or dynamic</strong> — Frontends generate fully static sites that can be served by any static host or CDN. APIs can run as containers or serve pre-built files.</span>
				</li>
			</ul>
		</div>
	</div>
</PageSection>

<!-- Maturity -->
<PageSection bg="bg-white">
	<h2 class="mb-4 text-2xl font-bold text-brand-navy">Maturity</h2>
	<p class="mb-8 max-w-3xl text-text-dark/70">
		The two tools are at different stages of development. Both are functional and deployed,
		but the Demand tool has a more mature framework architecture.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-xl">⚡</span>
				<h3 class="font-display font-bold text-brand-navy">Demand</h3>
			</div>
			<ul class="space-y-2 text-sm text-text-dark/70">
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Full-stack framework with clear separation</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Comprehensive test coverage (60+ tests)</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> CI/CD pipeline with GitHub Actions</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Documentation, coding standards, debugging guides</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Multi-language support (Paraglide i18n)</li>
			</ul>
		</div>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-xl">🌱</span>
				<h3 class="font-display font-bold text-brand-navy">Generation</h3>
			</div>
			<ul class="space-y-2 text-sm text-text-dark/70">
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Working generator with PyPSA optimization</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Streamlit dashboard with scenario controls</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Flexible API (local filesystem or HTTP server)</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Docker deployment support</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-text-dark/30">&#9675;</span> <span class="text-text-dark/50">Planned: SvelteKit frontend migration</span></li>
				<li class="flex items-start gap-2"><span class="mt-1 text-text-dark/30">&#9675;</span> <span class="text-text-dark/50">Planned: Enhanced documentation</span></li>
			</ul>
		</div>
	</div>

	<div class="mt-10 text-center">
		<Button href="/projects" variant="primary">
			View live projects <ArrowRight size={16} />
		</Button>
	</div>
</PageSection>
