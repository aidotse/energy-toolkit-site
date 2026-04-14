import type { ToolSlug } from './tools';

export type FrameworkStatus = 'stable' | 'preview' | 'planned';

export type Framework = {
	toolSlug: ToolSlug;
	name: string;
	repoUrl: string | null;
	isTemplate: boolean;
	status: FrameworkStatus;
	description: string;
};

export const frameworks: Framework[] = [
	{
		toolSlug: 'demand',
		name: 'energy-toolkit-demand',
		repoUrl: 'https://github.com/aidotse/energy-toolkit-demand',
		isTemplate: true,
		status: 'preview',
		description:
			'A full-stack framework for forecasting electricity demand. Python generator, Node.js + DuckDB API, SvelteKit explorer. Fork it, swap in your data and scenarios, deploy.'
	},
	{
		toolSlug: 'generation',
		name: 'energy-toolkit-generation',
		repoUrl: null,
		isTemplate: false,
		status: 'planned',
		description:
			'A reusable framework for the Generation tool is not yet funded. PyPSA-VGR currently exists as a standalone implementation — contact us if you are interested in funding a framework extraction.'
	}
];

export const frameworkForTool = (slug: ToolSlug): Framework | undefined =>
	frameworks.find((f) => f.toolSlug === slug);
