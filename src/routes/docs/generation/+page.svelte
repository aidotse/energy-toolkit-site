<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Generation Documentation — Energy Toolkit</title>
</svelte:head>

<PageSection>
	<a href="/docs" class="mb-6 inline-flex items-center gap-1 text-sm text-brand-teal hover:text-brand-med-teal transition-colors">
		<ArrowLeft size={14} /> Back to Docs
	</a>

	<h1 class="mb-4 text-4xl font-bold text-brand-navy">Generation Documentation</h1>
	<p class="mb-8 max-w-2xl text-text-dark/70">
		Technical reference for the Generation tool.
		Source: <a href="https://github.com/viktorbengtsson/pypsa-vgr" target="_blank" rel="noopener noreferrer" class="text-link hover:underline">github.com/viktorbengtsson/pypsa-vgr</a>
	</p>
</PageSection>

<PageSection bg="bg-white">
	<div class="mx-auto max-w-4xl prose prose-lg prose-headings:font-display prose-headings:text-brand-navy prose-a:text-link">
		<h2>Project Structure</h2>
<pre><code>{`/pypsa-vgr/
├── model/              # Core PyPSA modeling (network, constraints, assumptions)
├── generator/          # Scenario execution pipeline
├── input/              # All input data
│   ├── assumptions.csv # Technology costs 2020-2050
│   ├── demand/         # Historical demand data (3h resolution)
│   ├── weather/        # ERA5 weather data and capacity factors
│   ├── renewables/     # Renewable resource assessment
│   └── geo/            # Geographic boundaries and land use
├── api/                # Output data directory
├── dashboard/          # Streamlit frontend
├── workspace/          # Analysis Jupyter notebooks
├── paths.py            # Central path configuration
└── environment.yaml    # Conda environment specification`}</code></pre>

		<h2>Generator</h2>

		<h3>Pipeline</h3>
		<p>The generator runs a sequential pipeline for each scenario combination:</p>
		<ol>
			<li><strong>Validation</strong> — Checks geographic functions, weather/renewables files exist</li>
			<li><strong>Input generation</strong> — Creates parameters, demand profiles, network specifications</li>
			<li><strong>Optimization</strong> — Runs PyPSA model, generates statistics</li>
			<li><strong>Output</strong> — Produces results and addon results (CSV/NetCDF)</li>
			<li><strong>Cleanup</strong> — Optional removal of temporary files</li>
		</ol>

		<h3>Scenario Configuration</h3>
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

		<h2>PyPSA Network Model</h2>

		<h3>Network Topology</h3>
		<p>The model builds a power system network with the following components:</p>

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

		<h3>Constraints</h3>
		<ol>
			<li><strong>Biogas constraint</strong> — Limits biogas imports to a percentage of total demand</li>
			<li><strong>Self-sufficiency constraint</strong> — Caps energy sourced from market below self-sufficiency threshold</li>
			<li><strong>Battery flow constraint</strong> — Enforces charge/discharge capacity symmetry</li>
		</ol>

		<h2>Input Data</h2>

		<h3>Technology Assumptions</h3>
		<p>
			Comprehensive cost and performance data from 2020–2050 in <code>input/assumptions.csv</code>.
			Key technologies and their 2020 costs:
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
		<p>
			Costs are processed with multi-currency conversion (EUR, USD, SEK), present value calculations,
			and interpolation across the build period.
		</p>

		<h3>Weather Data</h3>
		<ul>
			<li><strong>Source:</strong> ERA5 reanalysis from Copernicus</li>
			<li><strong>Resolution:</strong> 3-hour temporal, 0.125° spatial</li>
			<li><strong>Year:</strong> 2023 baseline</li>
			<li><strong>Processing:</strong> Atlite generates cutout objects, capacity factors, and availability matrices</li>
		</ul>

		<h3>Demand Data</h3>
		<ul>
			<li>Historical hourly demand for SE3 region, normalized to 3-hour intervals</li>
			<li>Base demand: 19 TWh, target: 34 TWh by 2030</li>
			<li>Regional energy percentage breakdowns for VGR municipalities</li>
		</ul>

		<h3>Geographic Data</h3>
		<ul>
			<li>Swedish municipality boundaries (GeoJSON)</li>
			<li>Land use data by municipality</li>
			<li>VGR region: 49 municipalities in 4 sub-regions (Fyrbodal, Göteborgsregionen, Sjuhärad, Skaraborg)</li>
		</ul>

		<h3>Renewable Assessment</h3>
		<p>The <code>renewables.py</code> module handles:</p>
		<ul>
			<li><strong>Land exclusions</strong> — CORINE land-cover classification for realistic siting</li>
			<li><strong>Availability matrices</strong> — Per-grid-cell availability for solar, onshore wind, offshore wind</li>
			<li><strong>Capacity factors</strong> — Weather-dependent generation profiles per technology</li>
			<li>Results cached as NetCDF files for reuse</li>
		</ul>

		<h2>Dashboard</h2>

		<h3>Pages</h3>
		<table>
			<thead><tr><th>Page</th><th>Content</th></tr></thead>
			<tbody>
				<tr><td>Explorer</td><td>Main scenario exploration with charts, cards, and maps</td></tr>
				<tr><td>About</td><td>Project description (Markdown, bilingual)</td></tr>
				<tr><td>Assumptions</td><td>Technology costs and land use data tables</td></tr>
			</tbody>
		</table>

		<h3>Widgets</h3>
		<ul>
			<li><strong>Energy cards</strong> — Per-technology metrics (capacity, energy fraction, units)</li>
			<li><strong>Consumption chart</strong> — Stacked bar at weekly resolution with demand overlay</li>
			<li><strong>Performance</strong> — Met/unmet demand balance visualization</li>
			<li><strong>LCOE</strong> — Levelized cost breakdown by energy source</li>
			<li><strong>Land comparison</strong> — Bubble chart showing physical footprint vs municipal areas</li>
			<li><strong>Explainer</strong> — Auto-generated narrative text based on scenario results</li>
		</ul>

		<h3>API Modes</h3>
		<p>The dashboard's <code>library/api.py</code> supports three deployment modes:</p>
		<table>
			<thead><tr><th>Mode</th><th>Backend</th><th>Use Case</th></tr></thead>
			<tbody>
				<tr><td><code>local</code></td><td>Filesystem via pathlib</td><td>Development</td></tr>
				<tr><td><code>aws</code></td><td>S3 via boto3</td><td>Production</td></tr>
				<tr><td><code>aws-local</code></td><td>S3 with AWS profile</td><td>Staging / local testing</td></tr>
			</tbody>
		</table>

		<h3>Internationalization</h3>
		<p>
			Built-in Swedish/English support via a <code>language.py</code> dictionary system.
			All UI text, month names, metric labels, and content files have bilingual variants.
		</p>

		<h2>Deployment</h2>
		<h3>Docker</h3>
		<p>
			The included Dockerfile builds a Python 3.11 slim image that runs the Streamlit app.
			Host on any container service.
		</p>
<pre><code>{`FROM python:3.11.10-slim
WORKDIR /app
COPY . .
RUN pip install -r dashboard/requirements.txt
EXPOSE 8501
CMD ["streamlit", "run", "dashboard/app.py",
     "--server.address", "0.0.0.0",
     "--server.port", "8501"]`}</code></pre>

		<h3>Environment</h3>
		<ul>
			<li><code>API</code> environment variable selects deployment mode (local, aws, aws-local)</li>
			<li><code>DATA_ROOT</code> Streamlit secret overrides the default data path</li>
			<li>AWS credentials via standard boto3 credential chain</li>
		</ul>
	</div>
</PageSection>
