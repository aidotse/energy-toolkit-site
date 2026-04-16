import * as m from '$paraglide/messages';
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
	description: () => string;
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
		description: m.implementation_behovskartan_description,
		tags: ['SvelteKit', 'Swedish electricity', 'Energimyndigheten']
	},
	{
		toolSlug: 'generation',
		slug: 'pypsa-vgr',
		displayName: 'PyPSA-VGR',
		org: 'VGR',
		liveUrl: 'https://vgr.toolkit.energy',
		repoUrl: 'https://github.com/aidotse/pypsa-vgr',
		status: 'live',
		description: m.implementation_pypsavgr_description,
		tags: ['PyPSA', 'Streamlit', 'Västra Götaland']
	}
];

export const implementationsForTool = (slug: ToolSlug): Implementation[] =>
	implementations.filter((i) => i.toolSlug === slug);
