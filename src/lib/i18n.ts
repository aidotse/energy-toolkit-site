import * as runtime from '$paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';

export const i18n = createI18n(runtime, {
	// We generate our own <link rel="alternate" hreflang="..."> tags via a
	// SeoHead component (PLAN_SEO), using the real production URL rather than
	// Paraglide's internal `http://sveltekit-prerender/` placeholder.
	seo: {
		noAlternateLinks: true
	}
});
