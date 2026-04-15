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
			Demand-verktyget levereras som ett mall-repository. Forka det, rikta en kodningsagent mot
			konfigurationsfilerna, och anpassa det för din egen region och data.
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
			Generatorn tar historiska elbehovsdata och applicerar modulära transformeringar
			för att skapa framtidsscenarier. Transformeringssystemet är komponerbart — bygg scenarier
			genom att stapla funktioner som modifierar efterfrågekurvor för specifika segment och tidsperioder.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Flerparametrisk scenarioanalys</h4>
				<p class="text-xs text-text-dark/60">
					Definiera oberoende parametrar (elektrifieringsgrad, tillväxtfaktorer, effektivitet)
					som skapar ett multiplikativt scenarioutrymme. Varje parametervariation lagras
					separat och kombineras vid fråga.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Segmentgranularitet</h4>
				<p class="text-xs text-text-dark/60">
					Prognoser genereras per efterfrågesegment — industri, bostäder, transport,
					tjänster, etc. Segment kan aggregeras eller visas oberoende genom API:et.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Effektiv output</h4>
				<p class="text-xs text-text-dark/60">
					Data lagras som Parquet-filer med förberäknade aggregeringar för vanliga frågor
					(geografi × år, segment × år, nationellt × år). Detta ger 50–100× snabbare
					dashboard-frågor.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Konfigurationsdriven</h4>
				<p class="text-xs text-text-dark/60">
					Allt definieras i <code class="rounded bg-white px-1 text-xs">config.yaml</code>:
					scenarier, geografier, segment, parametrar, enheter. Ändra konfigurationen
					och regenerera — inga kodändringar krävs.
				</p>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">API</h3>
		<p class="mb-4 text-text-dark/70">
			Ett OpenAPI 3.1 REST-API som kombinerar förbyggda statiska endpoints med DuckDB-drivna
			dynamiska frågor. API:et läser Parquet-filer direkt — inget ETL-steg, ingen databas att underhålla.
		</p>
		<div class="mb-8 overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-brand-teal/10">
						<th class="py-2 pr-4 text-left font-bold text-brand-navy">Endpoint</th>
						<th class="py-2 pr-4 text-left font-bold text-brand-navy">Typ</th>
						<th class="py-2 text-left font-bold text-brand-navy">Beskrivning</th>
					</tr>
				</thead>
				<tbody class="text-text-dark/70">
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/scenarios</td><td class="py-2 pr-4">Statisk</td><td class="py-2">Scenariodefinitioner med parameterkombinationer</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/geographies</td><td class="py-2 pr-4">Statisk</td><td class="py-2">Geografiska regioner med metadata</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/parameters</td><td class="py-2 pr-4">Statisk</td><td class="py-2">Tillgängliga år, segment, upplösningar</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/config</td><td class="py-2 pr-4">Statisk</td><td class="py-2">Ramverkskonfiguration</td></tr>
					<tr class="border-b border-brand-teal/5"><td class="py-2 pr-4 font-mono text-xs">/globals</td><td class="py-2 pr-4">Statisk</td><td class="py-2">Min/max-gränser för diagramskalor</td></tr>
					<tr><td class="py-2 pr-4 font-mono text-xs">/demand</td><td class="py-2 pr-4">Dynamisk</td><td class="py-2">Tidsseriedata med flexibel filtrering, upplösning (1h–1Y) och aggregering (sum, mean, max)</td></tr>
				</tbody>
			</table>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Frontend (Explorer)</h3>
		<p class="mb-4 text-text-dark/70">
			En SvelteKit-applikation som renderar prognosdata som interaktiva visualiseringar. Byggd
			med Svelte 5 runes, Tailwind CSS, LayerChart och Mapbox GL. Genereras som en helt statisk
			webbplats som kan serveras från valfri statisk host eller CDN.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Diagram</h4>
				<p class="text-xs text-text-dark/60">
					Tidsserier, histogram, sektorsuppdelningar, värmekartor, geografiska stapeldiagram.
					Varje diagram har per-diagramsparameter-överstyrningar, scenariojämförelse, och
					export i flera format (PNG, SVG, CSV, JSON).
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Kartor</h4>
				<p class="text-xs text-text-dark/60">
					Koropletkartor drivna av Mapbox GL med regional nedbrytning. Visar efterfrågan per
					geografi med år- och segmentval. Responsiv från mobil till desktop.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Innehållssystem</h4>
				<p class="text-xs text-text-dark/60">
					Sidor och rapporter skrivs i Markdown med inbäddade interaktiva komponenter.
					Anpassad direktivsyntax låter domänexperter skriva berättande innehåll med
					levande datavisualiseringar inline.
				</p>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Teknikstack</h3>
		<div class="grid gap-4 md:grid-cols-3">
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Generator</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Python 3.9+</li>
					<li>Pandas, NumPy, PyArrow</li>
					<li>Jupyter-notebooks</li>
					<li>pytest</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Node.js 18+, Express</li>
					<li>DuckDB (Parquet-frågemotor)</li>
					<li>OpenAPI 3.1 Backend</li>
					<li>LRU-cache + ETag-validering</li>
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
			Teknisk referens för implementatörer. Expandera avsnittet nedan för API-detaljer,
			datapipelinens interna delar, fillayout och utvecklingsrutiner.
		</p>

		<details class="group rounded-xl border border-brand-teal/10 bg-brand-cream/30 open:bg-white">
			<summary class="cursor-pointer list-none rounded-xl px-6 py-4 font-medium text-brand-navy hover:bg-brand-cream/50">
				<span class="inline-flex items-center gap-2">
					<span class="text-brand-teal transition-transform group-open:rotate-90">▶</span>
					{m.section_technical_reference()}
				</span>
			</summary>
			<div class="prose prose-lg max-w-none px-6 pb-6 prose-headings:font-display prose-headings:text-brand-navy prose-a:text-link">
				<h3>Datapipeline</h3>
				<ol>
					<li><strong>Datagenerering</strong> — Generator (Python) skapar Parquet-filer i <code>/data/</code></li>
					<li><strong>Statiska endpoints</strong> — <code>generate-api.js</code> bygger JSON-filer i <code>/data/</code></li>
					<li><strong>API-server</strong> — Express + OpenAPI Backend serverar validerade endpoints + DuckDB-frågor</li>
					<li><strong>Frontend-laddning</strong> — <code>+page.ts</code> hämtar initial data och skickar props till komponenter</li>
					<li><strong>Komponentdata</strong> — Hybridmönster: komponenter accepterar props ELLER hämtar sin egen data</li>
				</ol>

				<h3>Statiska endpoints</h3>
				<p>Förbyggda JSON-filer som serveras direkt. Regenereras av <code>node generate-api.js --defaults</code>.</p>
				<table>
					<thead>
						<tr><th>Endpoint</th><th>Beskrivning</th></tr>
					</thead>
					<tbody>
						<tr><td><code>GET /globals</code></td><td>Min/max-gränser för olika aggregeringsnivåer</td></tr>
						<tr><td><code>GET /parameters</code></td><td>Tillgängliga år, geografier, segment, upplösningar</td></tr>
						<tr><td><code>GET /scenarios</code></td><td>Scenariodefinitioner med tillväxttakter och parameterkombinationer</td></tr>
						<tr><td><code>GET /geographies</code></td><td>Geografimetadata och GeoJSON</td></tr>
						<tr><td><code>GET /config</code></td><td>Allmän konfiguration</td></tr>
					</tbody>
				</table>

				<h3>Dynamisk endpoint</h3>
				<p><code>GET /demand</code> — Tidsseriedata driven av DuckDB-frågor på Parquet-filer.</p>
				<ul>
					<li><strong>Upplösningar:</strong> <code>1h</code>, <code>1d</code>, <code>1w</code>, <code>1M</code>, <code>1Y</code></li>
					<li><strong>Aggregeringar:</strong> <code>sum</code>, <code>mean</code>, <code>max</code></li>
					<li><strong>Filter:</strong> scenario, geografi, segment, tidsintervall</li>
					<li>Använd <code>geography='total'</code> och <code>segment='total'</code> för server-side-aggregering</li>
				</ul>

				<h4>Responsformat</h4>
				<p>Tidsseriedata returnerar en array av poster:</p>
				<pre><code>{responseSample}</code></pre>

				<h3>Datastruktur</h3>
				<h4>Parquet-filorganisation</h4>
				<pre><code>{parquetTree}</code></pre>

				<h4>Viktiga mönster</h4>
				<ul>
					<li><strong>Bas vs. scenarier</strong> — Basscenarier har NULL-parameterkolumner; parametriska scenarier har värden</li>
					<li><strong>UNION-frågor</strong> — DuckDB kombinerar bas- och parameterdata med schemanormalisering</li>
					<li><strong>Föraggregering</strong> — Generatorn skapar aggregerade tabeller för 50–100× snabbare vanliga frågor</li>
					<li><strong>Predicate pushdown</strong> — DuckDB pushar filter in i Parquet-skanningen för snabba frågor</li>
				</ul>

				<h3>Utvecklingsrutiner</h3>
				<ul>
					<li>Endast Svelte 5 runes — ingen Svelte 4-syntax</li>
					<li>TypeScript genomgående med strict mode</li>
					<li>Python följer PEP 8</li>
					<li>Konventionella commits: <code>type(scope): description</code></li>
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
			Live-applikationer byggda med Demand-ramverket.
		</p>
		<ImplementationGrid items={impls} />
	</div>
</PageSection>

<!-- Deploy and extend -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="deploy" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_deploy()}</h2>
		<p class="mb-6 text-text-dark/70">
			Stacken har två driftsättbara delar — en statisk frontend och ett API i container. Kör
			dem på din egen infrastruktur med det moln, den containerplattform eller statiska host
			du föredrar. Inget i ramverket är bundet till en specifik leverantör.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Frontend — statisk webbplats</h4>
				<p class="text-xs text-text-dark/60">
					Explorer byggs till ett helt statiskt paket. Driftsätt det till valfri statisk host
					eller CDN. Content-hash-cache-busting på assets låter dig sätta långa cache-tider säkert.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API — Docker-container</h4>
				<p class="text-xs text-text-dark/60">
					API:et levereras som en Docker-container som paketerar all Parquet-data. Kör det på
					valfri containerplattform med hälsokontroller och nolltidsuppdateringar.
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
