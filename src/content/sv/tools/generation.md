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
			Ett återanvändbart ramverk för Generation-verktyget finns på färdplanen men är ännu inte
			finansierat. PyPSA-VGR finns för närvarande som en fullständig implementation — koden är
			öppen källkod och kan klonas direkt.
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
			Generatorn använder PyPSA (Python for Power System Analysis) för att hitta den optimala
			mixen av förnybar kapacitet. Givet en efterfrågeprofil, väderdata och antaganden om
			teknikkostnader, bestämmer den hur mycket sol, vind, batterilagring och vätgaskapacitet
			som behövs för att möta efterfrågan under olika självförsörjningsgrader.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">PyPSA-optimering</h4>
				<p class="text-xs text-text-dark/60">
					Bygger ett kraftsystemsnätverk med bussar för last, förnybara, batteri, vätgas,
					och turbiner. Länkar modellerar ladda/ladda ur, elektrolys, och gasturbiner.
					Optimerar för minimal kostnad med hänsyn till självförsörjningsgrad och biogasbegränsningar.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Väderinformerade kapacitetsfaktorer</h4>
				<p class="text-xs text-text-dark/60">
					Använder ERA5-reanalysdata med 3-timmarsupplösning för att beräkna kapacitetsfaktorer
					för sol och vind. Atlite hanterar markanvändnings-exkluderingar med CORINE-klassificering
					för realistiska uppskattningar av tillgängliga ytor.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Flerscenarioutforskning</h4>
				<p class="text-xs text-text-dark/60">
					Konfigurationen definierar ett scenarioutrymme över självförsörjningsmål (50–100%),
					variationer i energibehov (-20% till +20%), vätgasalternativ, växlingar för havsbaserad vind,
					och biogasbegränsningar. Generatorn validerar och kör alla kombinationer.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Modellering av teknikkostnader</h4>
				<p class="text-xs text-text-dark/60">
					Omfattande kostnadsantaganden från 2020–2050 med stöd för flera valutor (EUR, USD, SEK),
					nuvärdesberäkningar och tekniklärokurvor. Täcker sol, vind på land/havs, batteri,
					vätgaselektrolys, kärnkraft och biogas.
				</p>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">API</h3>
		<p class="mb-6 text-text-dark/70">
			API-lagret abstraherar över lagringsbackenden genom ett enhetligt gränssnitt. Samma
			dashboard-kod läser scenariodata från lokalt filsystem under utveckling eller från
			valfri HTTP-åtkomlig lagring i produktion.
		</p>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Frontend (Dashboard)</h3>
		<p class="mb-4 text-text-dark/70">
			En Streamlit-applikation med interaktiva scenariokontroller och visualiseringar av
			energisystem. Designad för tre målgruppsnivåer.
		</p>
		<div class="mb-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Scenarioutforskare</h4>
				<p class="text-xs text-text-dark/60">
					Reglagekontroller för självförsörjningsmål och energiscenarier. Växla vätgas,
					havsbaserad vind och biogasbegränsningar. Bokmärkbara URL:er bevarar parameterstate.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Kapacitets- och kostnadsanalys</h4>
				<p class="text-xs text-text-dark/60">
					Energi-metrikkort som visar kapacitet per teknik. Staplade stapeldiagram för
					produktionsmix per vecka. LCOE-uppdelning per energikälla.
					Prestandamätningar som visar täckt/otäckt behov.
				</p>
			</div>
			<div class="rounded-lg border border-brand-teal/10 p-4">
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Geografisk kontext</h4>
				<p class="text-xs text-text-dark/60">
					Interaktiv karta med Folium för regionval. Markanvändningsjämförelse som visar
					de fysiska avtrycket av förnybara installationer relativt kommunala ytor.
				</p>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold text-brand-navy">Teknikstack</h3>
		<div class="grid gap-4 md:grid-cols-3">
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Generator</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Python 3.8+, PyPSA ≥0.28</li>
					<li>Atlite (förnybara resurser)</li>
					<li>Pandas, NumPy, GeoPandas</li>
					<li>CBC/GLPK/HiGHS-lösare</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">API</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Filbaserat (lokalt filsystem)</li>
					<li>Valfri HTTP-server-backend</li>
					<li>CSV + JSON som outputformat</li>
				</ul>
			</div>
			<div>
				<h4 class="mb-2 text-sm font-bold text-brand-navy">Frontend</h4>
				<ul class="space-y-1 text-xs text-text-dark/60">
					<li>Streamlit 1.38</li>
					<li>Plotly, Altair</li>
					<li>Folium (kartor)</li>
					<li>Tvåspråkig (svenska/engelska)</li>
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
			Teknisk referens för implementatörer. Expandera avsnittet nedan för modellinterna delar,
			scenariokonfiguration, indatastruktur och driftsättningsdetaljer.
		</p>

		<details class="group rounded-xl border border-brand-teal/10 bg-brand-cream/30 open:bg-white">
			<summary class="cursor-pointer list-none rounded-xl px-6 py-4 font-medium text-brand-navy hover:bg-brand-cream/50">
				<span class="inline-flex items-center gap-2">
					<span class="text-brand-teal transition-transform group-open:rotate-90">▶</span>
					{m.section_technical_reference()}
				</span>
			</summary>
			<div class="prose prose-lg max-w-none px-6 pb-6 prose-headings:font-display prose-headings:text-brand-navy prose-a:text-link">
				<h3>Projektstruktur</h3>
				<pre><code>{projectStructure}</code></pre>

				<h3>Generator-pipeline</h3>
				<p>Generatorn kör en sekventiell pipeline för varje scenariokombination:</p>
				<ol>
					<li><strong>Validering</strong> — Kontrollerar att geografiska funktioner och väder-/förnybarhetsfiler finns</li>
					<li><strong>Indata-generering</strong> — Skapar parametrar, efterfrågeprofiler och nätverksspecifikationer</li>
					<li><strong>Optimering</strong> — Kör PyPSA-modellen, genererar statistik</li>
					<li><strong>Output</strong> — Producerar resultat och tilläggsresultat (CSV/NetCDF)</li>
					<li><strong>Rensning</strong> — Valfri borttagning av temporära filer</li>
				</ol>

				<h4>Scenariokonfiguration</h4>
				<p>Scenarier definieras i JSON-konfigurationsfiler med följande parametrar:</p>
				<table>
					<thead><tr><th>Parameter</th><th>Intervall</th><th>Beskrivning</th></tr></thead>
					<tbody>
						<tr><td>Självförsörjning</td><td>50–100% (11 nivåer)</td><td>Mål för lokal produktion mot import</td></tr>
						<tr><td>Energiscenario</td><td>-20% till +20% (3 nivåer)</td><td>Efterfrågevariation från basprognos</td></tr>
						<tr><td>Vätgas</td><td>på/av</td><td>Inkludera vätgaselektrolys och lagring</td></tr>
						<tr><td>Havsbaserad vind</td><td>på/av</td><td>Inkludera havsbaserad vindkapacitet</td></tr>
						<tr><td>Biogasgräns</td><td>0%, 25%, 50%, 100%</td><td>Maximal biogasandel av total efterfrågan</td></tr>
					</tbody>
				</table>
				<p>Generatorn validerar antal scenarier (varnar &gt;10 000, blockerar &gt;50 000) innan körning.</p>

				<h3>PyPSA-nätverksmodell</h3>
				<h4>Bussar</h4>
				<ul>
					<li><strong>Lastbuss</strong> — Där efterfrågan betjänas</li>
					<li><strong>Förnybarhetsbuss</strong> — Sol- och vindproduktion</li>
					<li><strong>Batteribuss</strong> — Batterilagring</li>
					<li><strong>Vätgasbuss</strong> — Vätgaselektrolys och lagring</li>
					<li><strong>Turbinbuss</strong> — Gasturbiner</li>
				</ul>

				<h4>Generatorer</h4>
				<ul>
					<li>Solceller, landbaserad vind, havsbaserad vind</li>
					<li>Biogas (marknadsinköp)</li>
					<li>Backstop/import till hög marginalkostnad (900 SEK/MWh)</li>
				</ul>

				<h4>Lagring</h4>
				<ul>
					<li>Litiumjonbatterier med ladda/ladda ur-länkar och cyklingsbegränsningar</li>
					<li>Vätgaselektrolys → lagring → bränslecells-väg</li>
				</ul>

				<h4>Begränsningar</h4>
				<ol>
					<li><strong>Biogasbegränsning</strong> — Begränsar biogasimport till en andel av total efterfrågan</li>
					<li><strong>Självförsörjningsbegränsning</strong> — Sätter tak för energi från marknaden under självförsörjningströskeln</li>
					<li><strong>Batteriflödesbegränsning</strong> — Upprätthåller symmetri mellan ladda/ladda ur-kapacitet</li>
				</ol>

				<h3>Indata</h3>
				<h4>Teknikantaganden</h4>
				<p>
					Omfattande kostnads- och prestandadata från 2020–2050 i
					<code>input/assumptions.csv</code>. Viktiga teknologier och deras 2020-kostnader:
				</p>
				<table>
					<thead><tr><th>Teknologi</th><th>Kapitalkostnad (2020)</th><th>Livslängd</th></tr></thead>
					<tbody>
						<tr><td>Solceller</td><td>€560k/MW</td><td>25–40 år</td></tr>
						<tr><td>Landbaserad vind</td><td>€1,1–1,2M/MW</td><td>25–30 år</td></tr>
						<tr><td>Havsbaserad vind</td><td>€2,12M/MW</td><td>25–30 år</td></tr>
						<tr><td>Batterilagring</td><td>€246k/MWh</td><td>20–30 år</td></tr>
						<tr><td>H2-elektrolys</td><td>€1,3M/MWe</td><td>25 år</td></tr>
					</tbody>
				</table>

				<h4>Väderdata</h4>
				<ul>
					<li><strong>Källa:</strong> ERA5-reanalys från Copernicus</li>
					<li><strong>Upplösning:</strong> 3-timmars temporal, 0,125° spatial</li>
					<li><strong>År:</strong> 2023 som baslinje</li>
					<li><strong>Bearbetning:</strong> Atlite genererar cutout-objekt, kapacitetsfaktorer och tillgänglighetsmatriser</li>
				</ul>

				<h4>Efterfrågedata</h4>
				<ul>
					<li>Historisk timvis efterfrågan för SE3-regionen, normaliserad till 3-timmarsintervall</li>
					<li>Basbehov: 19 TWh, mål: 34 TWh 2030</li>
					<li>Regional energiprocentuppdelning för VGR:s kommuner</li>
				</ul>

				<h4>Geografisk data</h4>
				<ul>
					<li>Svenska kommungränser (GeoJSON)</li>
					<li>Markanvändningsdata per kommun</li>
					<li>VGR-regionen: 49 kommuner i 4 delregioner (Fyrbodal, Göteborgsregionen, Sjuhärad, Skaraborg)</li>
				</ul>

				<h3>Dashboard</h3>
				<h4>Sidor</h4>
				<table>
					<thead><tr><th>Sida</th><th>Innehåll</th></tr></thead>
					<tbody>
						<tr><td>Explorer</td><td>Huvud-scenarioutforskning med diagram, kort och kartor</td></tr>
						<tr><td>Om</td><td>Projektbeskrivning (Markdown, tvåspråkig)</td></tr>
						<tr><td>Antaganden</td><td>Teknikkostnader och tabeller för markanvändningsdata</td></tr>
					</tbody>
				</table>

				<h4>API-lägen</h4>
				<p>Dashboardens <code>library/api.py</code> abstraherar över lagringsbackenden bakom ett enhetligt gränssnitt. Backenden för lokalt filsystem används under utveckling; HTTP-server-backenden låter dashboarden läsa scenariodata från valfri HTTP-åtkomlig lagring i produktion.</p>
			</div>
		</details>
	</div>
</PageSection>

<!-- Implementations -->
<PageSection>
	<div class="mx-auto max-w-4xl">
		<h2 id="implementations" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_implementations()}</h2>
		<p class="mb-8 max-w-2xl text-text-dark/70">
			Live-applikationer byggda med Generation-verktyget.
		</p>
		<ImplementationGrid items={impls} />
	</div>
</PageSection>

<!-- Deploy and extend -->
<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl">
		<h2 id="deploy" class="mb-4 text-2xl font-bold text-brand-navy">{m.section_deploy()}</h2>
		<p class="mb-6 text-text-dark/70">
			Generation-verktyget driftsätts som en Docker-container som kör Streamlit-dashboarden.
			Kör det på valfri containerplattform; scenariodata kan serveras från lokalt filsystem
			eller valfri HTTP-åtkomlig lagring.
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
