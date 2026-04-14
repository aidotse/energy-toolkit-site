import * as m from '$paraglide/messages';

export type ToolSlug = 'demand' | 'generation';

export type Tool = {
	slug: ToolSlug;
	icon: string;
	name: () => string;
	tagline: () => string;
};

export const tools: Tool[] = [
	{
		slug: 'demand',
		icon: '⚡',
		name: m.tool_demand_name,
		tagline: m.tool_demand_tagline
	},
	{
		slug: 'generation',
		icon: '🌱',
		name: m.tool_generation_name,
		tagline: m.tool_generation_tagline
	}
];

export const toolBySlug = (slug: ToolSlug): Tool | undefined =>
	tools.find((t) => t.slug === slug);
