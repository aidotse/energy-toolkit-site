<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Demand — Energy Toolkit</title>
</svelte:head>

<PageSection>
	<a href="/tools" class="mb-6 inline-flex items-center gap-1 text-sm text-brand-teal hover:text-brand-med-teal transition-colors">
		<ArrowLeft size={14} /> Back to Tools
	</a>

	<h1 class="mb-2 text-4xl font-bold text-brand-navy">Demand</h1>
	<p class="mb-8 max-w-2xl text-lg text-text-dark/70">
		A full-stack tool for forecasting future electricity demand. Takes historical data,
		applies scenario transformations, and presents the results as interactive visualizations.
	</p>

	<div class="flex flex-wrap gap-3 mb-12">
		<Button href="https://staging.behovskartan.se" variant="primary" external>View live example</Button>
		<Button href="/docs/demand" variant="ghost">Documentation <ArrowRight size={14} /></Button>
	</div>
</PageSection>

<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-6 text-2xl font-bold text-brand-navy">Architecture</h2>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6 mb-8 font-mono text-sm">
			<pre class="text-text-dark/80">config.yaml                 ← Scenarios, geographies, segments, parameters
    │
    ▼
Generator (Python)          ← Historical data + modular transformations
    │
    ▼
/data/*.parquet             ← Base scenarios + parametric variations + aggregations
    │
    ▼
API (Node.js + DuckDB)      ← Static JSON endpoints + dynamic time series queries
    │
    ▼
Explorer (SvelteKit)        ← Charts, maps, reports, scenario comparison, export</pre>
		</div>

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Generator</h2>
		<p class="mb-4 text-text-dark/70">
			The generator takes historical electricity demand data and applies modular transformations
			to create future scenarios. The transformation system is composable — build scenarios by
			stacking functions that modify demand curves for specific segments and time periods.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Multi-parameter scenarios</h4>
				<p class="text-xs text-text-dark/60">
					Define independent parameters (electrification rates, growth factors, efficiency)
					that create a multiplicative scenario space. Each parameter variation is stored
					separately and combined at query time.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Segment granularity</h4>
				<p class="text-xs text-text-dark/60">
					Forecasts are generated per demand segment — industry, residential, transport,
					services, etc. Segments can be aggregated or viewed independently through the API.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Efficient output</h4>
				<p class="text-xs text-text-dark/60">
					Data is stored as Parquet files with pre-computed aggregations for common queries
					(geography × year, segment × year, national × year). This gives 50-100x speedup
					on dashboard queries.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Configuration-driven</h4>
				<p class="text-xs text-text-dark/60">
					Everything is defined in <code class="rounded bg-white px-1 text-xs">config.yaml</code>:
					scenarios, geographies, segments, parameters, units. Change the config
					and regenerate — no code changes needed.
				</p>
			</div>
		</div>

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">API</h2>
		<p class="mb-4 text-text-dark/70">
			An OpenAPI 3.1 REST API that combines pre-built static endpoints with DuckDB-powered
			dynamic queries. The API reads Parquet files directly — no ETL step, no database to maintain.
		</p>
		<div class="mb-8 overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-brand-teal/10">
						<th class="py-2 pr-4 text-left font-bold text-brand-navy">Endpoint</th>
						<th class="py-2 pr-4 text-left font-bold text-brand-navy">Type</th>
						<th class="py-2 text-left font-bold text-brand-navy">Description</th>
					</tr>
				</thead>
				<tbody class="text-text-dark/70">
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/scenarios</td><td class="py-2 pr-4">Static</td><td class="py-2">Scenario definitions with parameter combinations</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/geographies</td><td class="py-2 pr-4">Static</td><td class="py-2">Geographic regions with metadata</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/parameters</td><td class="py-2 pr-4">Static</td><td class="py-2">Available years, segments, resolutions</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/config</td><td class="py-2 pr-4">Static</td><td class="py-2">Framework configuration</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/globals</td><td class="py-2 pr-4">Static</td><td class="py-2">Min/max bounds for chart scales</td></tr>
					<tr><td class="py-2 pr-4 font-mono text-xs">/demand</td><td class="py-2 pr-4">Dynamic</td><td class="py-2">Time series data with flexible filtering, resolution (1h–1Y), and aggregation (sum, mean, max)</td></tr>
				</tbody>
			</table>
		</div>

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Frontend (Explorer)</h2>
		<p class="mb-4 text-text-dark/70">
			A SvelteKit application that renders forecast data as interactive visualizations. Built
			with Svelte 5 runes, Tailwind CSS, LayerChart, and Mapbox GL. Generates as a fully static
			site for cheap hosting.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Charts</h4>
				<p class="text-xs text-text-dark/60">
					Time series, histograms, sector breakdowns, heatmaps, geographic bar charts.
					Each chart has per-chart parameter overrides, scenario comparison, and multi-format
					export (PNG, SVG, CSV, JSON).
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Maps</h4>
				<p class="text-xs text-text-dark/60">
					Mapbox GL-powered choropleth maps with regional drill-down. Shows demand by
					geography with year and segment selection. Responsive from mobile to desktop.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Content system</h4>
				<p class="text-xs text-text-dark/60">
					Pages and reports authored in Markdown with embedded interactive components.
					Custom directive syntax lets domain experts write narrative content with
					live data visualizations inline.
				</p>
			</div>
		</div>

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Technology stack</h2>
		<div class="grid gap-4 md:grid-cols-3">
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Generator</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Python 3.9+</li>
					<li>Pandas, NumPy, PyArrow</li>
					<li>Jupyter notebooks</li>
					<li>pytest</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Node.js 18+, Express</li>
					<li>DuckDB (Parquet query engine)</li>
					<li>OpenAPI 3.1 Backend</li>
					<li>LRU cache + ETag validation</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Frontend</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>SvelteKit, Svelte 5 (runes)</li>
					<li>Tailwind CSS + container queries</li>
					<li>LayerChart, D3, Mapbox GL</li>
					<li>MDsveX, Paraglide (i18n)</li>
				</ul>
			</div>
		</div>
	</div>
</PageSection>

<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Deployment</h2>
		<p class="mb-6 text-text-dark/70">
			Included infrastructure scripts deploy to AWS with GitHub Actions and OIDC authentication.
			The full stack runs at approximately $26/month.
		</p>
		<div class="grid gap-4 md:grid-cols-2 mb-8">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Frontend → S3 + CloudFront</h4>
				<p class="text-xs text-text-dark/60">
					Static site synced to S3 with CloudFront CDN. Content-hash cache busting for
					assets, 1-hour cache for HTML. ~$1/month.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API → App Runner</h4>
				<p class="text-xs text-text-dark/60">
					Docker container on AWS App Runner. Includes all Parquet data in the image.
					Auto-scaling, health checks, zero-downtime deploys. ~$25/month.
				</p>
			</div>
		</div>

		<div class="flex flex-wrap gap-4">
			<Button href="/getting-started" variant="primary">Getting started <ArrowRight size={14} /></Button>
			<Button href="/docs/demand" variant="ghost">Full documentation <ArrowRight size={14} /></Button>
		</div>
	</div>
</PageSection>
