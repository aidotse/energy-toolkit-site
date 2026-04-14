import type { ToolSlug } from './tools';

export type ImplementationStatus = 'live' | 'staging' | 'archived';

export type Implementation = {
	toolSlug: ToolSlug;
	slug: string;
	displayName: string;
	org: string;
	liveUrl?: string;
	repoUrl?: string;
	screenshot?: string;
	status: ImplementationStatus;
	description: string;
	tags?: string[];
};

export const implementations: Implementation[] = [
	{
		toolSlug: 'demand',
		slug: 'behovskartan',
		displayName: 'Behovskartan',
		org: 'AI Sweden',
		liveUrl: 'https://staging.behovskartan.se',
		repoUrl: 'https://github.com/aidotse/behovskartan',
		status: 'staging',
		description:
			"Sweden's electricity demand forecast explorer. Visualizes projected demand across regions, sectors, and scenarios through 2050. Built for Energimyndigheten.",
		tags: ['SvelteKit', 'Swedish electricity', 'Energimyndigheten']
	},
	{
		toolSlug: 'generation',
		slug: 'pypsa-vgr',
		displayName: 'PyPSA-VGR',
		org: 'VGR',
		liveUrl: 'https://vgr.toolkit.energy',
		repoUrl: 'https://github.com/viktorbengtsson/pypsa-vgr',
		status: 'live',
		description:
			'Renewable capacity planner for Västra Götaland. Uses PyPSA optimization to determine the solar, wind, and storage mix needed to meet future demand.',
		tags: ['PyPSA', 'Streamlit', 'Västra Götaland']
	}
];

export const implementationsForTool = (slug: ToolSlug): Implementation[] =>
	implementations.filter((i) => i.toolSlug === slug);
