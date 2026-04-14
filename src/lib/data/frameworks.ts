import * as m from '$paraglide/messages';
import type { ToolSlug } from './tools';

export type FrameworkStatus = 'stable' | 'preview' | 'planned';

export type Framework = {
	toolSlug: ToolSlug;
	name: string;
	repoUrl: string | null;
	isTemplate: boolean;
	status: FrameworkStatus;
	description: () => string;
};

export const frameworks: Framework[] = [
	{
		toolSlug: 'demand',
		name: 'energy-toolkit-demand',
		repoUrl: 'https://github.com/aidotse/energy-toolkit-demand',
		isTemplate: true,
		status: 'preview',
		description: m.framework_demand_description
	},
	{
		toolSlug: 'generation',
		name: 'energy-toolkit-generation',
		repoUrl: null,
		isTemplate: false,
		status: 'planned',
		description: m.framework_generation_description
	}
];

export const frameworkForTool = (slug: ToolSlug): Framework | undefined =>
	frameworks.find((f) => f.toolSlug === slug);
