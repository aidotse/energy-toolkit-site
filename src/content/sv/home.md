<script>
	import PageSection from '$lib/components/PageSection.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ArrowRight, Zap } from 'lucide-svelte';
</script>

<!-- Hero -->
<PageSection bg="bg-brand-navy" class="text-white">
	<div class="max-w-3xl">
		<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-1.5 text-sm text-brand-gold">
			<Zap size={14} />
			Öppen källkod
		</div>
		<h1 class="mb-6 text-4xl font-bold leading-tight md:text-6xl">
			Öppen källkod för energiprognoser
		</h1>
		<p class="mb-8 text-lg leading-relaxed text-white/70 md:text-xl">
			Energy Toolkit är en samling verktyg med öppen källkod för att skapa, dela och
			visualisera energiprognoser. Varje verktyg följer samma designfilosofi:
			en generator, ett API och en interaktiv frontend.
		</p>
		<div class="flex flex-wrap gap-4">
			<Button href="/tools" variant="secondary">
				Utforska verktygen <ArrowRight size={16} />
			</Button>
			<Button href="/projects" variant="ghost">
				<span class="text-white">Se live-projekt</span>
			</Button>
		</div>
	</div>
</PageSection>

<!-- Two tools -->
<PageSection>
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold text-brand-navy">Två verktyg, en filosofi</h2>
		<p class="mx-auto max-w-2xl text-text-dark/70">
			Varje verktyg är en full-stack-applikation byggd kring samma mönster:
			en Python-generator skapar scenariodata, ett API serverar den, och en webbfrontend låter dig utforska den.
		</p>
	</div>
	<div class="grid gap-6 md:grid-cols-2">
		<FeatureCard
			icon="⚡"
			title="Demand"
			description="Prognostisera framtida elbehov. Generera scenariebaserade efterfrågeprognoser från historiska data, servera dem genom ett REST-API, och utforska dem med interaktiva diagram och kartor."
			href="/tools/demand"
		/>
		<FeatureCard
			icon="🌱"
			title="Generation"
			description="Planera förnybar kapacitet. Använd PyPSA-optimering av kraftsystem för att bestämma vad som behöver byggas för att möta framtida behov, med väderinformerad modellering och scenarioutforskning."
			href="/tools/generation"
		/>
	</div>
</PageSection>

<!-- Shared architecture -->
<PageSection bg="bg-white">
	<div class="mb-12 text-center">
		<h2 class="mb-4 text-3xl font-bold text-brand-navy">Gemensam designfilosofi</h2>
		<p class="mx-auto max-w-2xl text-text-dark/70">
			Båda verktygen följer samma arkitektur. Forka, plugga in dina data, och driftsätt.
		</p>
	</div>
	<div class="mx-auto max-w-3xl space-y-8">
		<div class="flex gap-4">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">1</div>
			<div>
				<h3 class="mb-1 font-display font-bold text-brand-navy">Generator</h3>
				<p class="text-sm text-text-dark/70">En Python-motor som skapar scenariebaserad prognosdata. Definiera dina modeller, kör generatorn, få strukturerad output redo att serveras.</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">2</div>
			<div>
				<h3 class="mb-1 font-display font-bold text-brand-navy">API</h3>
				<p class="text-sm text-text-dark/70">Ett standardiserat API som serverar genererad data. Statiska endpoints för metadata, dynamiska frågor för tidsserier — snabbt och flexibelt.</p>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">3</div>
			<div>
				<h3 class="mb-1 font-display font-bold text-brand-navy">Frontend</h3>
				<p class="text-sm text-text-dark/70">En interaktiv webbapplikation för att utforska data. Diagram, kartor, scenariojämförelse och export — designad för flera målgrupper.</p>
			</div>
		</div>
	</div>
</PageSection>

<!-- CTA -->
<PageSection>
	<div class="text-center">
		<h2 class="mb-4 text-3xl font-bold text-brand-navy">Se det i praktiken</h2>
		<p class="mx-auto mb-8 max-w-xl text-text-dark/70">
			Båda verktygen har live-referensprojekt som du kan utforska direkt.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<Button href="/projects" variant="primary">
				Se projekt <ArrowRight size={16} />
			</Button>
			<Button href="/getting-started" variant="ghost">
				Kom igång
			</Button>
		</div>
	</div>
</PageSection>
