<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Generation — Energy Toolkit</title>
</svelte:head>

<PageSection>
	<a href="/tools" class="mb-6 inline-flex items-center gap-1 text-sm text-brand-teal hover:text-brand-med-teal transition-colors">
		<ArrowLeft size={14} /> Back to Tools
	</a>

	<h1 class="mb-2 text-4xl font-bold text-brand-navy">Generation</h1>
	<p class="mb-8 max-w-2xl text-lg text-text-dark/70">
		A tool for planning renewable generation capacity. Given a future demand projection,
		what mix of solar, wind, and storage needs to be built — and what will it cost?
	</p>

	<div class="flex flex-wrap gap-3 mb-12">
		<Button href="https://vgr.toolkit.energy" variant="primary" external>View live example</Button>
		<Button href="/docs/generation" variant="ghost">Documentation <ArrowRight size={14} /></Button>
	</div>
</PageSection>

<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-6 text-2xl font-bold text-brand-navy">Architecture</h2>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6 mb-8 font-mono text-sm">
			<pre class="text-text-dark/80">config (JSON)                ← Scenarios, financial assumptions, geography
    │
    ▼
Generator (PyPSA)            ← Weather data + demand + optimization model
    │
    ▼
Output (CSV/NetCDF)          ← Capacity plans, costs, generation profiles
    │
    ▼
API (file-based)             ← Local filesystem, S3, or HTTP server
    │
    ▼
Dashboard (Streamlit)        ← Scenario exploration, capacity mix, LCOE analysis</pre>
		</div>

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Generator</h2>
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

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">API</h2>
		<p class="mb-6 text-text-dark/70">
			The API layer supports three deployment modes through a unified interface: local filesystem
			access for development, AWS S3 via boto3 for production, and profile-based S3 for staging.
			This means the same dashboard code works whether you're running locally or deployed to the cloud.
		</p>

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Frontend (Dashboard)</h2>
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

		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Technology stack</h2>
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
					<li>File-based (local or S3)</li>
					<li>boto3 for AWS integration</li>
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

<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-4 text-2xl font-bold text-brand-navy">Deployment</h2>
		<p class="mb-6 text-text-dark/70">
			The Generation tool deploys as a Docker container running the Streamlit dashboard,
			with scenario data served from S3 or local filesystem.
		</p>
		<div class="rounded-lg bg-brand-navy p-4 mb-8">
			<pre class="text-sm text-white/90"><code># Build and run locally
docker build -t pypsa-vgr .
docker run -p 8501:8501 pypsa-vgr

# Or run directly
streamlit run dashboard/app.py</code></pre>
		</div>

		<div class="flex flex-wrap gap-4">
			<Button href="/getting-started" variant="primary">Getting started <ArrowRight size={14} /></Button>
			<Button href="/docs/generation" variant="ghost">Full documentation <ArrowRight size={14} /></Button>
		</div>
	</div>
</PageSection>
