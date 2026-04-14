<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let activeTool = $state<'demand' | 'generation'>('demand');
</script>

<svelte:head>
	<title>Getting Started — Energy Toolkit</title>
</svelte:head>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Getting Started</h1>
	<p class="mb-8 max-w-2xl text-lg text-text-dark/70">
		Pick a tool and follow the steps to get a working application on your machine.
	</p>

	<!-- Tool selector -->
	<div class="mb-12 flex gap-2">
		<button
			class="rounded-lg px-5 py-2.5 text-sm font-bold transition-all {activeTool === 'demand'
				? 'bg-brand-teal text-white'
				: 'border border-brand-teal/20 text-brand-teal hover:bg-brand-teal/5'}"
			onclick={() => (activeTool = 'demand')}
		>
			Demand
		</button>
		<button
			class="rounded-lg px-5 py-2.5 text-sm font-bold transition-all {activeTool === 'generation'
				? 'bg-brand-teal text-white'
				: 'border border-brand-teal/20 text-brand-teal hover:bg-brand-teal/5'}"
			onclick={() => (activeTool = 'generation')}
		>
			Generation
		</button>
	</div>

	{#if activeTool === 'demand'}
		<div class="mx-auto max-w-3xl space-y-12">
			<section>
				<h2 class="mb-4 text-2xl font-bold text-brand-navy">Prerequisites</h2>
				<ul class="space-y-2 text-text-dark/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span><strong>Node.js 18+</strong> — For the API and Explorer frontend</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span><strong>Python 3.9+</strong> — For the Generator</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span><strong>DuckDB</strong> — Installed automatically via Node package</span>
					</li>
				</ul>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">1</div>
					<h2 class="text-2xl font-bold text-brand-navy">Fork and clone</h2>
				</div>
				<div class="ml-11 rounded-lg bg-brand-navy p-4">
					<pre class="text-sm text-white/90"><code>git clone https://github.com/aidotse/energy-toolkit-demand.git
cd energy-toolkit-demand
npm install</code></pre>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">2</div>
					<h2 class="text-2xl font-bold text-brand-navy">Configure</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Edit <code class="rounded bg-brand-cream px-1.5 py-0.5 text-xs font-mono">config.yaml</code> to define your scenarios, geographies, segments, and parameters.
						This single file drives the entire stack.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>scenarios:
  - id: base
    name: Base Scenario
    description: Reference projection

geographies:
  - id: total
    name: National Total

segments:
  - id: residential
    name: Residential
  - id: industry
    name: Industry</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">3</div>
					<h2 class="text-2xl font-bold text-brand-navy">Generate data</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Run the Generator to create forecast data. Use the included Jupyter notebook or build your own pipeline.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>cd generator
pip install -r requirements.txt
jupyter notebook notebooks/behovskartan2.ipynb</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">4</div>
					<h2 class="text-2xl font-bold text-brand-navy">Build and serve</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Generate the static API endpoints, start the API server, and launch the Explorer.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code># Build static endpoints
cd api && node generate-api.js --defaults

# Start API server (port 4010)
npm start

# In a new terminal — start Explorer (port 5173)
cd explorer && npm run dev</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">5</div>
					<h2 class="text-2xl font-bold text-brand-navy">Deploy</h2>
				</div>
				<div class="ml-11">
					<p class="text-text-dark/80">
						The included infrastructure scripts deploy to AWS with GitHub Actions and OIDC authentication.
						Frontend goes to S3 + CloudFront (~$1/mo), API to App Runner (~$25/mo).
						See the <a href="/docs/demand" class="text-link hover:underline">deployment documentation</a> for details.
					</p>
				</div>
			</section>
		</div>
	{:else}
		<div class="mx-auto max-w-3xl space-y-12">
			<section>
				<h2 class="mb-4 text-2xl font-bold text-brand-navy">Prerequisites</h2>
				<ul class="space-y-2 text-text-dark/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span><strong>Mamba or Conda</strong> — For Python environment management</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span><strong>Python 3.8+</strong> — Managed through the Conda environment</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span><strong>A linear solver</strong> — CBC, GLPK, or HiGHS (included in environment)</span>
					</li>
				</ul>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">1</div>
					<h2 class="text-2xl font-bold text-brand-navy">Fork and clone</h2>
				</div>
				<div class="ml-11 rounded-lg bg-brand-navy p-4">
					<pre class="text-sm text-white/90"><code>git clone https://github.com/YOUR-ORG/energy-toolkit-generation.git
cd energy-toolkit-generation</code></pre>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">2</div>
					<h2 class="text-2xl font-bold text-brand-navy">Set up the environment</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Create the Conda environment with all dependencies — PyPSA, Atlite, solvers,
						Streamlit, and geospatial libraries.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>mamba env create -f environment.yaml
mamba activate pypsa-vgr</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">3</div>
					<h2 class="text-2xl font-bold text-brand-navy">Configure scenarios</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Edit the configuration JSON to define your scenario space — financial assumptions,
						demand projections, technology options, and geographic scope.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>{'{'}
  "financial": {'{'}
    "base_currency": "SEK",
    "discount_rate": 0.04
  {'}'},
  "demand": {'{'}
    "base_demand": 19000000,
    "target_demand": 34000000,
    "target_year": 2030
  {'}'},
  "variables": {'{'}
    "self_sufficiency": [0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    "energy_scenario": [-0.2, 0, 0.2]
  {'}'}
{'}'}</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">4</div>
					<h2 class="text-2xl font-bold text-brand-navy">Run the generator</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Generate scenarios using the Jupyter notebook or the CLI. The generator validates
						configurations, runs PyPSA optimization for each combination, and writes results.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code># Via Jupyter notebook
jupyter notebook generator/run-generator.ipynb

# Or via Python directly
python generator/generator.py</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">5</div>
					<h2 class="text-2xl font-bold text-brand-navy">Launch the dashboard</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						Start the Streamlit dashboard to explore scenarios interactively.
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>streamlit run dashboard/app.py</code></pre>
					</div>
					<p class="mt-4 text-text-dark/80">
						The dashboard opens at <code class="rounded bg-brand-cream px-1.5 py-0.5 text-xs font-mono">http://localhost:8501</code>.
						Use the sidebar to select regions and adjust scenario parameters.
					</p>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">6</div>
					<h2 class="text-2xl font-bold text-brand-navy">Deploy</h2>
				</div>
				<div class="ml-11">
					<p class="text-text-dark/80">
						Deploy as a Docker container. The included Dockerfile runs the Streamlit app
						on port 8501. Host on any container service (AWS ECS, App Runner, Azure Container Apps, etc).
					</p>
					<div class="mt-4 rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>docker build -t pypsa-vgr .
docker run -p 8501:8501 pypsa-vgr</code></pre>
					</div>
				</div>
			</section>
		</div>
	{/if}
</PageSection>
