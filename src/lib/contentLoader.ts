import type { Component } from 'svelte';
import * as runtime from '$paraglide/runtime';

type ContentModule = { default: Component };

// Eager glob: bundles every markdown file at build time. Per-locale prerender
// only emits the one variant that the current page reads, so dead-code
// elimination drops the unused locale from the final HTML bundle.
const modules = import.meta.glob<ContentModule>('/src/content/**/*.md', {
	eager: true
});

/**
 * Load a page's rendered markdown component for the current locale.
 * Falls back to English if the current locale's file is missing (useful
 * while `PLAN_CONTENT.md` translation is in progress).
 */
export function loadPageContent(slug: string): Component {
	const lang = runtime.languageTag();
	const primary = modules[`/src/content/${lang}/${slug}.md`];
	if (primary) return primary.default;
	const fallback = modules[`/src/content/en/${slug}.md`];
	if (!fallback) {
		throw new Error(`No content found for slug "${slug}" in any locale`);
	}
	return fallback.default;
}
