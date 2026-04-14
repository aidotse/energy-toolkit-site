export type ToolSlug = 'demand' | 'generation';

export type Tool = {
	slug: ToolSlug;
	icon: string;
	name: string;
	tagline: string;
};

export const tools: Tool[] = [
	{
		slug: 'demand',
		icon: '⚡',
		name: 'Demand',
		tagline:
			'How much electricity will we need? Scenario-based demand projections from historical data, with interactive charts and geographic maps.'
	},
	{
		slug: 'generation',
		icon: '🌱',
		name: 'Generation',
		tagline:
			'What do we need to build? PyPSA-based optimization to plan renewable capacity — solar, wind, storage — with weather-informed modeling.'
	}
];

export const toolBySlug = (slug: ToolSlug): Tool | undefined =>
	tools.find((t) => t.slug === slug);
