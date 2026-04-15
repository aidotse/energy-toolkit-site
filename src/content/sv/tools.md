<script>
	import PageSection from '$lib/components/PageSection.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowRight } from 'lucide-svelte';
</script>

<PageSection>
	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Verktyg</h1>
	<p class="mb-12 max-w-2xl text-lg text-text-dark/70">
		Energy Toolkit erbjuder två verktyg för energiprognoser. Båda följer samma
		designfilosofi — en Python-generator, ett data-API och en interaktiv webbfrontend —
		men hanterar olika frågor om energisystemet.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<FeatureCard
			icon="⚡"
			title="Demand"
			description="Hur mycket el kommer vi att behöva? Scenariebaserade efterfrågeprognoser från historiska data, med interaktiva diagram och geografiska kartor."
			href="/tools/demand"
		/>
		<FeatureCard
			icon="🌱"
			title="Generation"
			description="Vad behöver vi bygga? PyPSA-baserad optimering för att planera förnybar kapacitet — sol, vind, lagring — med väderinformerad modellering."
			href="/tools/generation"
		/>
	</div>
</PageSection>

<!-- Shared architecture -->
<PageSection bg="bg-white">
	<h2 class="mb-4 text-2xl font-bold text-brand-navy">Gemensam designfilosofi</h2>
	<p class="mb-8 max-w-3xl text-text-dark/70">
		Båda verktygen är byggda kring samma trelagers-arkitektur. Detta är inte
		tillfälligt — det är ett medvetet designval som gör varje verktyg oberoende
		forkbart, driftsättningsbart och anpassningsbart samtidigt som de delar en gemensam
		mental modell.
	</p>

	<div class="grid gap-8 md:grid-cols-3">
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<h3 class="mb-2 font-display font-bold text-brand-navy">Generator</h3>
			<p class="mb-3 text-sm text-text-dark/70">
				En Python-motor som tar in indata och konfiguration, kör en modell, och producerar
				strukturerad output. Generatorn är den enda delen som kräver domänexpertis.
			</p>
			<ul class="space-y-1 text-xs text-text-dark/50">
				<li><strong>Demand:</strong> Historisk data + transformeringar → Parquet</li>
				<li><strong>Generation:</strong> Väder + efterfrågan + PyPSA → kapacitetsplaner</li>
			</ul>
		</div>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<h3 class="mb-2 font-display font-bold text-brand-navy">API</h3>
			<p class="mb-3 text-sm text-text-dark/70">
				Ett datalager som serverar generatoroutput genom standardiserade endpoints.
				Statisk JSON för metadata, dynamiska frågor för tidsserier och scenariodata.
			</p>
			<ul class="space-y-1 text-xs text-text-dark/50">
				<li><strong>Demand:</strong> OpenAPI 3.1 + DuckDB på Parquet</li>
				<li><strong>Generation:</strong> Filbaserat API (lokalt eller HTTP-server)</li>
			</ul>
		</div>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<h3 class="mb-2 font-display font-bold text-brand-navy">Frontend</h3>
			<p class="mb-3 text-sm text-text-dark/70">
				En interaktiv webbapplikation för att utforska data. Diagram, kartor,
				scenariojämförelse — designad för flera målgrupper från allmänhet till domänexperter.
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
	<h2 class="mb-4 text-2xl font-bold text-brand-navy">Designade för att forkas</h2>
	<p class="mb-8 max-w-3xl text-text-dark/70">
		Verktygen är inte SaaS-produkter — de är startpunkter. Forka ett repository, byt in
		dina egna data och modeller, och driftsätt. Arkitekturen är designad för att göra detta enkelt.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<div>
			<h3 class="mb-3 font-display font-bold text-brand-navy">Flexibel indata</h3>
			<ul class="space-y-3 text-sm text-text-dark/70">
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Valfri region</strong> — Tillhandahåll dina egna GeoJSON-gränser och efterfrågedata. Demand-verktyget levereras med svenska data; anpassa det för ditt land eller din region.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Valfri scenariomodell</strong> — Generatorerna är modulära. Ersätt transformeringsfunktionerna med dina egna prognosmodeller utan att störa datapipelinen.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Konfigurationsdriven</strong> — Scenarier, geografier, segment och parametrar definieras i konfigurationsfiler (YAML eller JSON). Ändra konfigurationen, regenerera, och hela stacken uppdateras.</span>
				</li>
			</ul>
		</div>
		<div>
			<h3 class="mb-3 font-display font-bold text-brand-navy">Flexibel driftsättning</h3>
			<ul class="space-y-3 text-sm text-text-dark/70">
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Kör lokalt</strong> — Båda verktygen fungerar på en laptop utan molntjänster. Bra för utveckling och intern användning.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Driftsätt till molnet</strong> — Båda verktygen kör på valfri standardmolnplattform. Ta med din egen infrastruktur; verktygen är fria från leverantörsberoenden.</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></span>
					<span><strong>Statisk eller dynamisk</strong> — Frontends genererar helt statiska webbplatser som kan serveras av valfri statisk host eller CDN. API:er kan köras som containrar eller servera förbyggda filer.</span>
				</li>
			</ul>
		</div>
	</div>
</PageSection>

<!-- Maturity -->
<PageSection bg="bg-white">
	<h2 class="mb-4 text-2xl font-bold text-brand-navy">Mognadsgrad</h2>
	<p class="mb-8 max-w-3xl text-text-dark/70">
		De två verktygen är i olika utvecklingsstadier. Båda är funktionella och driftsatta,
		men Demand-verktyget har en mer mogen ramverksarkitektur.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-xl">⚡</span>
				<h3 class="font-display font-bold text-brand-navy">Demand</h3>
			</div>
			<ul class="space-y-2 text-sm text-text-dark/70">
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Full-stack-ramverk med tydlig separation</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Omfattande testtäckning (60+ tester)</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> CI/CD-pipeline med GitHub Actions</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Dokumentation, kodstandarder, felsökningsguider</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Flerspråksstöd (Paraglide i18n)</li>
			</ul>
		</div>
		<div class="rounded-xl border border-brand-teal/10 bg-brand-cream/50 p-6">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-xl">🌱</span>
				<h3 class="font-display font-bold text-brand-navy">Generation</h3>
			</div>
			<ul class="space-y-2 text-sm text-text-dark/70">
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Fungerande generator med PyPSA-optimering</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Streamlit-dashboard med scenariokontroller</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Flexibelt API (lokalt filsystem eller HTTP-server)</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-link">&#10003;</span> Docker-driftsättningsstöd</li>
				<li class="flex items-start gap-2"><span class="mt-1 text-text-dark/30">&#9675;</span> <span class="text-text-dark/50">Planerat: migration till SvelteKit-frontend</span></li>
				<li class="flex items-start gap-2"><span class="mt-1 text-text-dark/30">&#9675;</span> <span class="text-text-dark/50">Planerat: utökad dokumentation</span></li>
			</ul>
		</div>
	</div>

	<div class="mt-10 text-center">
		<Button href="/projects" variant="primary">
			Se live-projekt <ArrowRight size={16} />
		</Button>
	</div>
</PageSection>
