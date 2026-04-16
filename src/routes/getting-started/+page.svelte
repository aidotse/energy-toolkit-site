<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import * as m from '$paraglide/messages';
	import * as runtime from '$paraglide/runtime';

	let activeTool = $state<'demand' | 'generation'>('demand');

	const isSv = $derived(runtime.languageTag() === 'sv');

	// Bilingual helper: pick SV when active, otherwise EN.
	const t = $derived((en: string, sv: string) => (isSv ? sv : en));
</script>

<SeoHead title={m.page_getting_started_title()} description={m.page_getting_started_description()} />

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">
		{t('Getting Started', 'Kom igång')}
	</h1>
	<p class="mb-8 max-w-2xl text-lg text-text-dark/70">
		{t(
			'Pick a tool and follow the steps to get a working application on your machine.',
			'Välj ett verktyg och följ stegen för att få en fungerande applikation på din maskin.'
		)}
	</p>

	<!-- Tool selector -->
	<div class="mb-12 flex gap-2">
		<button
			class="rounded-lg px-5 py-2.5 text-sm font-bold transition-all {activeTool === 'demand'
				? 'bg-brand-teal text-white'
				: 'border border-brand-teal/20 text-brand-teal hover:bg-brand-teal/5'}"
			onclick={() => (activeTool = 'demand')}
		>
			{m.tool_demand_name()}
		</button>
		<button
			class="rounded-lg px-5 py-2.5 text-sm font-bold transition-all {activeTool === 'generation'
				? 'bg-brand-teal text-white'
				: 'border border-brand-teal/20 text-brand-teal hover:bg-brand-teal/5'}"
			onclick={() => (activeTool = 'generation')}
		>
			{m.tool_generation_name()}
		</button>
	</div>

	{#if activeTool === 'demand'}
		<div class="mx-auto max-w-3xl space-y-12">
			<section>
				<h2 class="mb-4 text-2xl font-bold text-brand-navy">
					{t('Prerequisites', 'Förutsättningar')}
				</h2>
				<ul class="space-y-2 text-text-dark/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span>
							<strong>Node.js 18+</strong>: {t(
								'For the API and Explorer frontend',
								'För API:et och Explorer-frontend'
							)}
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span>
							<strong>Python 3.9+</strong>: {t('For the Generator', 'För generatorn')}
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span>
							<strong>DuckDB</strong>: {t(
								'Installed automatically via Node package',
								'Installeras automatiskt via Node-paketet'
							)}
						</span>
					</li>
				</ul>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">1</div>
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Fork and clone', 'Forka och klona')}
					</h2>
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
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Configure', 'Konfigurera')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t('Edit', 'Redigera')}
						<code class="rounded bg-brand-cream px-1.5 py-0.5 text-xs font-mono">config.yaml</code>
						{t(
							'to define your scenarios, geographies, segments, and parameters. This single file drives the entire stack.',
							'för att definiera dina scenarier, geografier, segment och parametrar. Den enda filen driver hela stacken.'
						)}
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
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Generate data', 'Generera data')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t(
							'Run the Generator to create forecast data. Use the included Jupyter notebook or build your own pipeline.',
							'Kör generatorn för att skapa prognosdata. Använd den medföljande Jupyter-notebooken eller bygg din egen pipeline.'
						)}
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>cd generator
pip install -r requirements.txt
jupyter notebook notebooks/example.ipynb</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">4</div>
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Build and serve', 'Bygg och servera')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t(
							'Generate the static API endpoints, start the API server, and launch the Explorer.',
							'Generera de statiska API-endpointerna, starta API-servern och lansera Explorer.'
						)}
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code># Build static endpoints
cd api && node generate-api.js --defaults

# Start API server (port 4010)
npm start

# In a new terminal, start Explorer (port 5173)
cd explorer && npm run dev</code></pre>
					</div>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">5</div>
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Deploy', 'Driftsätt')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="text-text-dark/80">
						{t(
							'The stack has two deployable pieces: a static frontend built from the Explorer, and a Docker container for the API. Run them on your own infrastructure. See the',
							'Stacken har två driftsättbara delar: en statisk frontend byggd från Explorer, och en Docker-container för API:et. Kör dem på din egen infrastruktur. Se'
						)}
						<a href="/tools/demand#deploy" class="text-link hover:underline">
							{t(
								'deployment section on the Demand page',
								'driftsättningsavsnittet på Demand-sidan'
							)}
						</a>
						{t('for details.', 'för detaljer.')}
					</p>
				</div>
			</section>
		</div>
	{:else}
		<div class="mx-auto max-w-3xl space-y-12">
			<section>
				<h2 class="mb-4 text-2xl font-bold text-brand-navy">
					{t('Prerequisites', 'Förutsättningar')}
				</h2>
				<ul class="space-y-2 text-text-dark/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span>
							<strong>{t('Mamba or Conda', 'Mamba eller Conda')}</strong>: {t(
								'For Python environment management',
								'För hantering av Python-miljöer'
							)}
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span>
							<strong>Python 3.8+</strong>: {t(
								'Managed through the Conda environment',
								'Hanteras genom Conda-miljön'
							)}
						</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal"></span>
						<span>
							<strong>{t('A linear solver', 'En linjär lösare')}</strong>: {t(
								'CBC, GLPK, or HiGHS (included in environment)',
								'CBC, GLPK eller HiGHS (ingår i miljön)'
							)}
						</span>
					</li>
				</ul>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">1</div>
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Fork and clone', 'Forka och klona')}
					</h2>
				</div>
				<div class="ml-11 rounded-lg bg-brand-navy p-4">
					<pre class="text-sm text-white/90"><code>git clone https://github.com/aidotse/pypsa-vgr.git
cd pypsa-vgr</code></pre>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">2</div>
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Set up the environment', 'Konfigurera miljön')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t(
							'Create the Conda environment with all dependencies: PyPSA, Atlite, solvers, Streamlit, and geospatial libraries.',
							'Skapa Conda-miljön med alla beroenden: PyPSA, Atlite, lösare, Streamlit och geospatiala bibliotek.'
						)}
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
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Configure scenarios', 'Konfigurera scenarier')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t(
							'Edit the configuration JSON to define your scenario space: financial assumptions, demand projections, technology options, and geographic scope.',
							'Redigera konfigurations-JSON:en för att definiera ditt scenarioutrymme: finansiella antaganden, efterfrågeprognoser, teknikalternativ och geografisk omfattning.'
						)}
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
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Run the generator', 'Kör generatorn')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t(
							'Generate scenarios using the Jupyter notebook or the CLI. The generator validates configurations, runs PyPSA optimization for each combination, and writes results.',
							'Generera scenarier med Jupyter-notebooken eller CLI:t. Generatorn validerar konfigurationer, kör PyPSA-optimering för varje kombination och skriver resultat.'
						)}
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
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Launch the dashboard', 'Starta dashboarden')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="mb-4 text-text-dark/80">
						{t(
							'Start the Streamlit dashboard to explore scenarios interactively.',
							'Starta Streamlit-dashboarden för att utforska scenarier interaktivt.'
						)}
					</p>
					<div class="rounded-lg bg-brand-navy p-4">
						<pre class="text-sm text-white/90"><code>streamlit run dashboard/app.py</code></pre>
					</div>
					<p class="mt-4 text-text-dark/80">
						{t('The dashboard opens at', 'Dashboarden öppnas på')}
						<code class="rounded bg-brand-cream px-1.5 py-0.5 text-xs font-mono">http://localhost:8501</code>.
						{t(
							'Use the sidebar to select regions and adjust scenario parameters.',
							'Använd sidopanelen för att välja regioner och justera scenarioparametrar.'
						)}
					</p>
				</div>
			</section>

			<section>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">6</div>
					<h2 class="text-2xl font-bold text-brand-navy">
						{t('Deploy', 'Driftsätt')}
					</h2>
				</div>
				<div class="ml-11">
					<p class="text-text-dark/80">
						{t(
							'Deploy as a Docker container. The included Dockerfile runs the Streamlit app on port 8501. Run it on any container platform of your choice.',
							'Driftsätt som en Docker-container. Den medföljande Dockerfile kör Streamlit-appen på port 8501. Kör det på valfri containerplattform.'
						)}
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
