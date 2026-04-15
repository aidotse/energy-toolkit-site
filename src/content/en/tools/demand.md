<script>
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import FrameworkCard from '$lib/components/FrameworkCard.svelte';
	import ImplementationGrid from '$lib/components/ImplementationGrid.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import * as m from '$paraglide/messages';
	import { toolBySlug } from '$lib/data/tools';
	import { frameworkForTool } from '$lib/data/frameworks';
	import { implementationsForTool } from '$lib/data/implementations';
	import {
		demandArchitectureDiagram as architectureDiagram,
		demandResponseSample as responseSample,
		demandParquetTree as parquetTree
	} from '$lib/data/codeExamples';

	const tool = toolBySlug('demand');
	const framework = frameworkForTool('demand');
	const impls = implementationsForTool('demand');
	const primaryImpl = impls.find((i) => i.liveUrl);
</script>

<!-- Hero -->
<PageSection>
	<a
		href="/tools"
		class="mb-6 inline-flex items-center gap-1 text-sm text-brand-teal transition-colors hover:text-brand-med-teal"
	>
		<ArrowLeft size={14} /> {m.action_back_to_tools()}
	</a>

	<div class="mb-3 text-3xl">{tool.icon}</div>
	<h1 class="mb-3 text-4xl font-bold text-brand-navy">{tool.name()}</h1>
	<p class="mb-8 max-w-2xl text-lg text-text-dark/70">{tool.tagline()}</p>

	<div class="flex flex-wrap gap-3">
		{#if primaryImpl?.liveUrl}
			<Button href={primaryImpl.liveUrl} variant="primary" external>{m.action_view_live_example()}</Button>
		{/if}
		{#if framework.repoUrl}
			<Button href={framework.repoUrl} variant="ghost" external>{m.action_framework_repo()}</Button>
		{/if}
		<Button href="/getting-started" variant="ghost">
			{m.action_get_started()} <ArrowRight size={14} />
		</Button>
		<Button href="#reference" variant="ghost">{m.action_jump_to_reference()}</Button>
	</div>
</PageSection>

<!-- Framework -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="framework" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_framework()}</h2>
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
		<h2 id="how-it-works" class="mb-6 text-2xl font-bold text-brand-navy">{m.section_how_it_works()}</h2>

		<div
			class="mb-8 rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6 font-mono text-sm"
		>
			<pre class="text-text-dark/80">{architectureDiagram}</pre>
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
			with Svelte 5 runes, Tailwind CSS, LayerChart, and Mapbox GL. Generates as a fully
			static site that can be served from any static host or CDN.
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
		<h2 id="reference" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_reference()}</h2>
		<p class="mb-6 text-text-dark/70">
			Technical reference for implementers. Expand the section below for API details, data
			pipeline internals, file layout, and development practices.
		</p>

		<details class="group rounded-xl border border-brand-teal/10 bg-brand-cream/30 open:bg-white">
			<summary class="cursor-pointer list-none rounded-xl px-6 py-4 font-medium text-brand-navy hover:bg-brand-cream/50">
				<span class="inline-flex items-center gap-2">
					<span class="text-brand-teal transition-transform group-open:rotate-90">▶</span>
					{m.section_technical_reference()}
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
				<pre><code>{responseSample}</code></pre>

				<h3>Data structure</h3>
				<h4>Parquet file organization</h4>
				<pre><code>{parquetTree}</code></pre>

				<h4>Key patterns</h4>
				<ul>
					<li><strong>Base vs scenarios</strong> — Base scenarios have NULL parameter columns; parametric scenarios have values</li>
					<li><strong>UNION queries</strong> — DuckDB combines base and parametric data with schema normalization</li>
					<li><strong>Pre-aggregation</strong> — Generator creates aggregated tables for 50-100x speedup on common queries</li>
					<li><strong>Predicate pushdown</strong> — DuckDB pushes filters into Parquet scanning for fast queries</li>
				</ul>

				<h3>Development practices</h3>
				<ul>
					<li>Svelte 5 runes only — no Svelte 4 syntax</li>
					<li>TypeScript throughout with strict mode</li>
					<li>Python follows PEP 8</li>
					<li>Conventional commits: <code>type(scope): description</code></li>
				</ul>
			</div>
		</details>
	</div>
</PageSection>

<!-- Implementations -->
<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 id="implementations" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_implementations()}</h2>
		<p class="mb-8 max-w-2xl text-text-dark/70">
			Live applications built with the Demand framework.
		</p>
		<ImplementationGrid items={impls} />
	</div>
</PageSection>

<!-- Deploy and extend -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="deploy" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_deploy()}</h2>
		<p class="mb-6 text-text-dark/70">
			The stack has two deployable pieces — a static frontend and a containerized API. Run
			them on your own infrastructure with your preferred cloud, container platform, or static
			host. Nothing in the framework is tied to a specific vendor.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Frontend — static site</h4>
				<p class="text-xs text-text-dark/60">
					The Explorer builds to a fully static bundle. Deploy it to any static host or CDN.
					Content-hash cache busting on assets lets you set long cache lifetimes safely.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API — Docker container</h4>
				<p class="text-xs text-text-dark/60">
					The API ships as a Docker container that bundles all Parquet data. Run it on any
					container platform with health checks and zero-downtime updates.
				</p>
			</div>
		</div>

		<div class="flex flex-wrap gap-4">
			<Button href="/getting-started" variant="primary">
				{m.action_get_started()} <ArrowRight size={14} />
			</Button>
			{#if framework.repoUrl}
				<Button href={framework.repoUrl} variant="ghost" external>{m.action_framework_repo()}</Button>
			{/if}
		</div>
	</div>
</PageSection>
