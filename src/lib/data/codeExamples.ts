// Multi-line code / ASCII content used inside mdsvex content files.
// Held here so the content files can keep their <script> blocks simple.
// mdsvex's preprocessor crashes when consts with template literals live
// directly in the content-file script block.

export const demandArchitectureDiagram = `config.yaml                 ← Scenarios, geographies, segments, parameters
    │
    ▼
Generator (Python)          ← Historical data + modular transformations
    │
    ▼
/data/*.parquet             ← Base scenarios + parametric variations + aggregations
    │
    ▼
API (Node.js + DuckDB)      ← Static JSON endpoints + dynamic time series queries
    │
    ▼
Explorer (SvelteKit)        ← Charts, maps, reports, scenario comparison, export`;

export const demandResponseSample = `{ "period": "2025-01-01T00:00:00Z", "value": 123.45, "geography": "SE01", "segment": "housing" }`;

export const demandParquetTree = `/data/
├── base/
│   └── {scenario_id}/
│       └── data.parquet            # Base scenario data
├── scenarios/
│   └── {param1}={val1}/
│       └── {param2}={val2}/
│           └── data.parquet        # Parametric variations
├── aggregated/
│   ├── geography_yearly.parquet    # For maps
│   ├── segment_yearly.parquet      # For sector charts
│   ├── national_yearly.parquet     # For time series
│   └── scenario_metadata.parquet   # Parameter combinations
└── [static JSON endpoints]`;

export const generationArchitectureDiagram = `config (JSON)                ← Scenarios, financial assumptions, geography
    │
    ▼
Generator (PyPSA)            ← Weather data + demand + optimization model
    │
    ▼
Output (CSV/NetCDF)          ← Capacity plans, costs, generation profiles
    │
    ▼
API (file-based)             ← Local filesystem or HTTP server
    │
    ▼
Dashboard (Streamlit)        ← Scenario exploration, capacity mix, LCOE analysis`;

export const generationProjectStructure = `/pypsa-vgr/
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
└── environment.yaml    # Conda environment specification`;

export const generationDeployCode = `# Build and run locally
docker build -t pypsa-vgr .
docker run -p 8501:8501 pypsa-vgr

# Or run directly
streamlit run dashboard/app.py`;
