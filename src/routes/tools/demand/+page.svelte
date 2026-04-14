<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import FrameworkCard from '$lib/components/FrameworkCard.svelte';
	import ImplementationGrid from '$lib/components/ImplementationGrid.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { toolBySlug } from '$lib/data/tools';
	import { frameworkForTool } from '$lib/data/frameworks';
	import { implementationsForTool } from '$lib/data/implementations';

	const tool = toolBySlug('demand')!;
	const framework = frameworkForTool('demand')!;
	const impls = implementationsForTool('demand');
	const primaryImpl = impls.find((i) => i.liveUrl);
</script>

<svelte:head>
	<title>Demand — Energy Toolkit</title>
	<meta
		name="description"
		content="A full-stack framework for forecasting electricity demand. Python generator, Node.js + DuckDB API, SvelteKit explorer."
	/>
</svelte:head>

<!-- Hero -->
<PageSection>
	<a
		href="/tools"
		class="mb-6 inline-flex items-center gap-1 text-sm text-brand-teal transition-colors hover:text-brand-med-teal"
	>
		<ArrowLeft size={14} /> Back to Tools
	</a>

	<div class="mb-3 text-3xl">{tool.icon}</div>
	<h1 class="mb-3 text-4xl font-bold text-brand-navy">{tool.name}</h1>
	<p class="mb-8 max-w-2xl text-lg text-text-dark/70">{tool.tagline}</p>

	<div class="flex flex-wrap gap-3">
		{#if primaryImpl?.liveUrl}
			<Button href={primaryImpl.liveUrl} variant="primary" external>View live example</Button>
		{/if}
		{#if framework.repoUrl}
			<Button href={framework.repoUrl} variant="ghost" external>Framework repo</Button>
		{/if}
		<Button href="/getting-started" variant="ghost">
			Get started <ArrowRight size={14} />
		</Button>
		<Button href="#reference" variant="ghost">Jump to reference</Button>
	</div>
</PageSection>

<!-- Framework -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="framework" class="mb-4 text-2xl font-bold text-brand-navy">Framework</h2>
		<p class="mb-6 max-w-2xl text-text-dark/70">
			The Demand tool ships as a template repository. Fork it, point a coding agent at the
			config files, and customize it for your own region and data.
		</p>
		<FrameworkCard {framework} />
	</div>
</PageSection>

<!-- How it works -->
<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 id="how-it-works" class="mb-6 text-2xl font-bold text-brand-navy">How it works</h2>

		<div
			class="mb-8 rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6 font-mono text-sm"
		>
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

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Generator</h3>
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

		<h3 class="mb-4 text-xl font-bold text-brand-navy">API</h3>
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

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Frontend (Explorer)</h3>
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

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Technology stack</h3>
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

<!-- Reference (collapsed) -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="reference" class="mb-4 text-2xl font-bold text-brand-navy">Reference</h2>
		<p class="mb-6 text-text-dark/70">
			Technical reference for implementers. Expand the section below for API details, data
			pipeline internals, file layout, and development practices.
		</p>

		<details class="group rounded-xl border border-brand-teal/10 bg-brand-cream/30 open:bg-white">
			<summary class="cursor-pointer list-none rounded-xl px-6 py-4 font-medium text-brand-navy hover:bg-brand-cream/50">
				<span class="inline-flex items-center gap-2">
					<span class="text-brand-teal transition-transform group-open:rotate-90">▶</span>
					Technical reference
				</span>
			</summary>
			<div class="prose prose-lg max-w-none px-6 pb-6 prose-headings:font-display prose-headings:text-brand-navy prose-a:text-link">
				<h3>Data pipeline</h3>
				<ol>
					<li><strong>Data generation</strong> — Generator (Python) creates Parquet files in <code>/data/</code></li>
					<li><strong>Static endpoints</strong> — <code>generate-api.js</code> builds JSON files in <code>/data/</code></li>
					<li><strong>API server</strong> — Express + OpenAPI Backend serves validated endpoints + DuckDB queries</li>
					<li><strong>Frontend loading</strong> — <code>+page.ts</code> fetches initial data and passes props to components</li>
					<li><strong>Component data</strong> — Hybrid pattern: components accept props OR fetch their own data</li>
				</ol>

				<h3>Static endpoints</h3>
				<p>Pre-built JSON files served directly. Regenerated by <code>node generate-api.js --defaults</code>.</p>
				<table>
					<thead>
						<tr><th>Endpoint</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>GET /globals</code></td><td>Min/max bounds for different aggregation levels</td></tr>
						<tr><td><code>GET /parameters</code></td><td>Available years, geographies, segments, resolutions</td></tr>
						<tr><td><code>GET /scenarios</code></td><td>Scenario definitions with growth rates and parameter combinations</td></tr>
						<tr><td><code>GET /geographies</code></td><td>Geography metadata and GeoJSON</td></tr>
						<tr><td><code>GET /config</code></td><td>General configuration</td></tr>
					</tbody>
				</table>

				<h3>Dynamic endpoint</h3>
				<p><code>GET /demand</code> — Time series data powered by DuckDB queries on Parquet files.</p>
				<ul>
					<li><strong>Resolutions:</strong> <code>1h</code>, <code>1d</code>, <code>1w</code>, <code>1M</code>, <code>1Y</code></li>
					<li><strong>Aggregations:</strong> <code>sum</code>, <code>mean</code>, <code>max</code></li>
					<li><strong>Filters:</strong> scenario, geography, segment, time range</li>
					<li>Use <code>geography='total'</code> and <code>segment='total'</code> for server-side aggregation</li>
				</ul>

				<h4>Response format</h4>
				<p>Time series data returns an array of records:</p>
				<pre><code>{`{ "period": "2025-01-01T00:00:00Z", "value": 123.45, "geography": "SE01", "segment": "housing" }`}</code></pre>

				<h3>Data structure</h3>
				<h4>Parquet file organization</h4>
<pre><code>{`/data/
├── base/
│   └── {scenario_id}/
│       └── data.parquet            # Base scenario data
├── scenarios/
│   └── {param1}={val1}/
│       └── {param2}={val2}/
│           └── data.parquet        # Parametric variations
├── aggregated/
│   ├── geography_yearly.parquet    # For maps
│   ├── segment_yearly.parquet      # For sector charts
│   ├── national_yearly.parquet     # For time series
│   └── scenario_metadata.parquet   # Parameter combinations
└── [static JSON endpoints]`}</code></pre>

				<h4>Key patterns</h4>
				<ul>
					<li><strong>Base vs scenarios</strong> — Base scenarios have NULL parameter columns; parametric scenarios have values</li>
					<li><strong>UNION queries</strong> — DuckDB combines base and parametric data with schema normalization</li>
					<li><strong>Pre-aggregation</strong> — Generator creates aggregated tables for 50-100x speedup on common queries</li>
					<li><strong>Predicate pushdown</strong> — DuckDB pushes filters into Parquet scanning for fast queries</li>
				</ul>

				<h3>Static endpoint generation</h3>
				<p>
					<code>generate-api.js</code> orchestrates all static endpoint generation. It calls
					<code>generate-endpoints.js</code> which runs individual endpoint functions:
				</p>
				<table>
					<thead>
						<tr><th>Output File</th><th>Source Function</th><th>Inputs</th></tr>
					</thead>
					<tbody>
						<tr><td><code>parameters.json</code></td><td><code>generateParameters()</code></td><td><code>parameters.yaml</code> + <code>openapi.yaml</code></td></tr>
						<tr><td><code>geographies.json</code></td><td><code>generateGeographies()</code></td><td><code>config.yaml</code></td></tr>
						<tr><td><code>scenarios.json</code></td><td><code>generateScenarios()</code></td><td><code>config.yaml</code></td></tr>
						<tr><td><code>aggregations.json</code></td><td><code>generateAggregations()</code></td><td><code>config.yaml</code></td></tr>
						<tr><td><code>config.json</code></td><td><code>generateConfig()</code></td><td><code>config.yaml</code></td></tr>
						<tr><td><code>globals.json</code></td><td><code>generateGlobalsFile()</code></td><td>Parquet files via DuckDB</td></tr>
					</tbody>
				</table>

				<h3>Explorer architecture</h3>
				<p>
					The Explorer is a modular visual framework designed for easy customization. Components
					can be added, removed, or replaced independently.
				</p>

				<h4>Component patterns</h4>
				<ul>
					<li><strong>Hybrid data loading</strong> — Components accept <code>data</code> as props; if null/empty, they fetch their own data</li>
					<li><strong>Standardized interfaces</strong> — <code>BaseChartProps</code>, <code>TimeSeriesChartProps</code>, <code>GeographicChartProps</code></li>
					<li><strong>Container queries</strong> — Components respond to container width, not viewport</li>
					<li><strong>Shared UI</strong> — <code>LoadingSkeleton</code>, <code>ErrorState</code>, <code>EmptyState</code> with loading/error/empty variants</li>
				</ul>

				<h4>Content system</h4>
				<p>
					Markdown files in <code>/src/content/{'{locale}'}/</code> with YAML frontmatter. A
					custom directive preprocessor transforms <code>:::Component{'{props}'}</code> syntax
					into Svelte component tags, allowing domain experts to embed interactive
					visualizations in narrative content.
				</p>

				<h4>Chart export</h4>
				<ul>
					<li><strong>SVG:</strong> Extracts SVG from LayerChart components</li>
					<li><strong>CSV:</strong> Chart data with metadata headers</li>
					<li><strong>JSON:</strong> Full data with metadata object</li>
					<li><strong>PNG:</strong> Canvas-based rendering (partial)</li>
				</ul>

				<h3>Development practices</h3>
				<ul>
					<li>Svelte 5 runes only — no Svelte 4 syntax</li>
					<li>TypeScript throughout with strict mode</li>
					<li>Python follows PEP 8</li>
					<li>Conventional commits: <code>type(scope): description</code></li>
				</ul>

				<h4>Testing</h4>
				<ul>
					<li><strong>API:</strong> <code>cd api &amp;&amp; npm test</code> — query builders, cache, endpoints</li>
					<li><strong>Explorer:</strong> <code>cd explorer &amp;&amp; npm test</code> — components, utilities, content loading</li>
					<li><strong>E2E:</strong> <code>cd explorer &amp;&amp; npm run test:e2e</code> — Playwright browser tests</li>
					<li><strong>Generator:</strong> <code>cd generator &amp;&amp; pytest</code> — data generation validation</li>
				</ul>
			</div>
		</details>
	</div>
</PageSection>

<!-- Implementations -->
<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 id="implementations" class="mb-4 text-2xl font-bold text-brand-navy">Implementations</h2>
		<p class="mb-8 max-w-2xl text-text-dark/70">
			Live applications built with the Demand framework.
		</p>
		<ImplementationGrid items={impls} />
	</div>
</PageSection>

<!-- Deploy and extend -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="deploy" class="mb-4 text-2xl font-bold text-brand-navy">Deploy and extend</h2>
		<p class="mb-6 text-text-dark/70">
			Included infrastructure scripts deploy to AWS with GitHub Actions and OIDC authentication.
			The full stack runs at approximately $26/month.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
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
			<Button href="/getting-started" variant="primary">
				Getting started <ArrowRight size={14} />
			</Button>
			{#if framework.repoUrl}
				<Button href={framework.repoUrl} variant="ghost" external>Framework repo</Button>
			{/if}
		</div>
	</div>
</PageSection>
