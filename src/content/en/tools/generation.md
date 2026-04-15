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
		generationArchitectureDiagram as architectureDiagram,
		generationProjectStructure as projectStructure,
		generationDeployCode as deployCode
	} from '$lib/data/codeExamples';

	const tool = toolBySlug('generation');
	const framework = frameworkForTool('generation');
	const impls = implementationsForTool('generation');
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
			A reusable framework for the Generation tool is on the roadmap but not yet funded.
			PyPSA-VGR currently exists as a full implementation — the code is open source and can
			be cloned directly.
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
			The generator uses PyPSA (Python for Power System Analysis) to find the optimal renewable
			capacity mix. Given a demand profile, weather data, and technology cost assumptions, it
			determines how much solar, wind, battery storage, and hydrogen capacity is needed to meet
			demand under different self-sufficiency targets.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">PyPSA optimization</h4>
				<p class="text-xs text-text-dark/60">
					Builds a power system network with buses for load, renewables, battery, hydrogen,
					and turbines. Links model charge/discharge, electrolysis, and gas turbines.
					Optimizes for minimum cost subject to self-sufficiency and biogas constraints.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Weather-informed capacity factors</h4>
				<p class="text-xs text-text-dark/60">
					Uses ERA5 reanalysis data at 3-hour resolution to compute solar and wind capacity
					factors. Atlite handles land-cover exclusions using CORINE classification for
					realistic available area estimates.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Multi-scenario exploration</h4>
				<p class="text-xs text-text-dark/60">
					Configuration defines a scenario space across self-sufficiency targets (50–100%),
					energy demand variations (-20% to +20%), hydrogen options, offshore wind toggles,
					and biogas limits. The generator validates and runs all combinations.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Technology cost modeling</h4>
				<p class="text-xs text-text-dark/60">
					Comprehensive cost assumptions from 2020–2050 with multi-currency support (EUR, USD, SEK),
					present value calculations, and technology learning curves. Covers solar, onshore/offshore
					wind, battery, hydrogen electrolysis, nuclear, and biogas.
				</p>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">API</h3>
		<p class="mb-6 text-text-dark/70">
			The API layer abstracts over the storage backend through a unified interface. The same
			dashboard code reads scenario data from the local filesystem during development or from
			any HTTP-accessible store in production.
		</p>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Frontend (Dashboard)</h3>
		<p class="mb-4 text-text-dark/70">
			A Streamlit application with interactive scenario controls and energy system visualizations.
			Designed for three audience levels.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Scenario explorer</h4>
				<p class="text-xs text-text-dark/60">
					Slider controls for self-sufficiency targets and energy scenarios. Toggle hydrogen,
					offshore wind, and biogas limits. Bookmarkable URLs preserve parameter state.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Capacity & cost analysis</h4>
				<p class="text-xs text-text-dark/60">
					Energy metric cards showing capacity per technology. Stacked bar charts for
					generation mix at weekly resolution. LCOE breakdown by energy source.
					Performance metrics showing met/unmet demand.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Geographic context</h4>
				<p class="text-xs text-text-dark/60">
					Interactive map with Folium for regional selection. Land use comparison
					showing physical footprint of renewable installations relative to municipal areas.
				</p>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Technology stack</h3>
		<div class="grid gap-4 md:grid-cols-3">
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Generator</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Python 3.8+, PyPSA ≥0.28</li>
					<li>Atlite (renewable resources)</li>
					<li>Pandas, NumPy, GeoPandas</li>
					<li>CBC/GLPK/HiGHS solvers</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>File-based (local filesystem)</li>
					<li>Optional HTTP server backend</li>
					<li>CSV + JSON output formats</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Frontend</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Streamlit 1.38</li>
					<li>Plotly, Altair</li>
					<li>Folium (maps)</li>
					<li>Bilingual (Swedish/English)</li>
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
			Technical reference for implementers. Expand the section below for model internals,
			scenario configuration, input data structure, and deployment details.
		</p>

		<details class="group rounded-xl border border-brand-teal/10 bg-brand-cream/30 open:bg-white">
			<summary class="cursor-pointer list-none rounded-xl px-6 py-4 font-medium text-brand-navy hover:bg-brand-cream/50">
				<span class="inline-flex items-center gap-2">
					<span class="text-brand-teal transition-transform group-open:rotate-90">▶</span>
					{m.section_technical_reference()}
				</span>
			</summary>
			<div class="prose prose-lg max-w-none px-6 pb-6 prose-headings:font-display prose-headings:text-brand-navy prose-a:text-link">
				<h3>Project structure</h3>
				<pre><code>{projectStructure}</code></pre>

				<h3>Generator pipeline</h3>
				<p>The generator runs a sequential pipeline for each scenario combination:</p>
				<ol>
					<li><strong>Validation</strong> — Checks geographic functions, weather/renewables files exist</li>
					<li><strong>Input generation</strong> — Creates parameters, demand profiles, network specifications</li>
					<li><strong>Optimization</strong> — Runs PyPSA model, generates statistics</li>
					<li><strong>Output</strong> — Produces results and addon results (CSV/NetCDF)</li>
					<li><strong>Cleanup</strong> — Optional removal of temporary files</li>
				</ol>

				<h4>Scenario configuration</h4>
				<p>Scenarios are defined in JSON configuration files with these parameters:</p>
				<table>
					<thead><tr><th>Parameter</th><th>Range</th><th>Description</th></tr></thead>
					<tbody>
						<tr><td>Self-sufficiency</td><td>50–100% (11 levels)</td><td>Target for local generation vs imports</td></tr>
						<tr><td>Energy scenario</td><td>-20% to +20% (3 levels)</td><td>Demand variation from base projection</td></tr>
						<tr><td>Hydrogen</td><td>on/off</td><td>Include hydrogen electrolysis and storage</td></tr>
						<tr><td>Offshore wind</td><td>on/off</td><td>Include offshore wind capacity</td></tr>
						<tr><td>Biogas limit</td><td>0%, 25%, 50%, 100%</td><td>Maximum biogas share of total demand</td></tr>
					</tbody>
				</table>
				<p>The generator validates scenario counts (warns &gt;10,000, blocks &gt;50,000) before execution.</p>

				<h3>PyPSA network model</h3>
				<h4>Buses</h4>
				<ul>
					<li><strong>Load bus</strong> — Where demand is served</li>
					<li><strong>Renewable bus</strong> — Solar and wind generation</li>
					<li><strong>Battery bus</strong> — Battery storage</li>
					<li><strong>Hydrogen bus</strong> — Hydrogen electrolysis and storage</li>
					<li><strong>Turbine bus</strong> — Gas turbines</li>
				</ul>

				<h4>Generators</h4>
				<ul>
					<li>Solar PV, onshore wind, offshore wind</li>
					<li>Biogas (market purchase)</li>
					<li>Backstop/import at high marginal cost (900 SEK/MWh)</li>
				</ul>

				<h4>Storage</h4>
				<ul>
					<li>Lithium-ion batteries with charge/discharge links and cycling constraints</li>
					<li>Hydrogen electrolysis → storage → fuel cell path</li>
				</ul>

				<h4>Constraints</h4>
				<ol>
					<li><strong>Biogas constraint</strong> — Limits biogas imports to a percentage of total demand</li>
					<li><strong>Self-sufficiency constraint</strong> — Caps energy sourced from market below self-sufficiency threshold</li>
					<li><strong>Battery flow constraint</strong> — Enforces charge/discharge capacity symmetry</li>
				</ol>

				<h3>Input data</h3>
				<h4>Technology assumptions</h4>
				<p>
					Comprehensive cost and performance data from 2020–2050 in
					<code>input/assumptions.csv</code>. Key technologies and their 2020 costs:
				</p>
				<table>
					<thead><tr><th>Technology</th><th>Capital Cost (2020)</th><th>Lifetime</th></tr></thead>
					<tbody>
						<tr><td>Solar PV</td><td>€560k/MW</td><td>25–40 years</td></tr>
						<tr><td>Onshore Wind</td><td>€1.1–1.2M/MW</td><td>25–30 years</td></tr>
						<tr><td>Offshore Wind</td><td>€2.12M/MW</td><td>25–30 years</td></tr>
						<tr><td>Battery Storage</td><td>€246k/MWh</td><td>20–30 years</td></tr>
						<tr><td>H2 Electrolysis</td><td>€1.3M/MWe</td><td>25 years</td></tr>
					</tbody>
				</table>

				<h4>Weather data</h4>
				<ul>
					<li><strong>Source:</strong> ERA5 reanalysis from Copernicus</li>
					<li><strong>Resolution:</strong> 3-hour temporal, 0.125° spatial</li>
					<li><strong>Year:</strong> 2023 baseline</li>
					<li><strong>Processing:</strong> Atlite generates cutout objects, capacity factors, and availability matrices</li>
				</ul>

				<h4>Demand data</h4>
				<ul>
					<li>Historical hourly demand for SE3 region, normalized to 3-hour intervals</li>
					<li>Base demand: 19 TWh, target: 34 TWh by 2030</li>
					<li>Regional energy percentage breakdowns for VGR municipalities</li>
				</ul>

				<h4>Geographic data</h4>
				<ul>
					<li>Swedish municipality boundaries (GeoJSON)</li>
					<li>Land use data by municipality</li>
					<li>VGR region: 49 municipalities in 4 sub-regions (Fyrbodal, Göteborgsregionen, Sjuhärad, Skaraborg)</li>
				</ul>

				<h3>Dashboard</h3>
				<h4>Pages</h4>
				<table>
					<thead><tr><th>Page</th><th>Content</th></tr></thead>
					<tbody>
						<tr><td>Explorer</td><td>Main scenario exploration with charts, cards, and maps</td></tr>
						<tr><td>About</td><td>Project description (Markdown, bilingual)</td></tr>
						<tr><td>Assumptions</td><td>Technology costs and land use data tables</td></tr>
					</tbody>
				</table>

				<h4>API modes</h4>
				<p>The dashboard's <code>library/api.py</code> abstracts over the storage backend behind a unified interface. The local filesystem backend is used for development; the HTTP-server backend lets the dashboard read scenario data from any HTTP-accessible store in production.</p>
			</div>
		</details>
	</div>
</PageSection>

<!-- Implementations -->
<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 id="implementations" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_implementations()}</h2>
		<p class="mb-8 max-w-2xl text-text-dark/70">
			Live applications built with the Generation tool.
		</p>
		<ImplementationGrid items={impls} />
	</div>
</PageSection>

<!-- Deploy and extend -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="deploy" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_deploy()}</h2>
		<p class="mb-6 text-text-dark/70">
			The Generation tool deploys as a Docker container running the Streamlit dashboard. Run
			it on any container platform; scenario data can be served from the local filesystem or
			any HTTP-accessible store.
		</p>
		<div class="mb-8 rounded-lg bg-brand-navy p-4">
			<pre class="text-sm text-white/90"><code>{deployCode}</code></pre>
		</div>

		<div class="flex flex-wrap gap-4">
			<Button href="/getting-started" variant="primary">
				{m.action_get_started()} <ArrowRight size={14} />
			</Button>
			{#if primaryImpl?.repoUrl}
				<Button href={primaryImpl.repoUrl} variant="ghost" external>{m.action_implementation_source()}</Button>
			{/if}
		</div>
	</div>
</PageSection>
