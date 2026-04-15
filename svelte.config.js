import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md']
		})
	],
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		alias: {
			$paraglide: './src/lib/paraglide'
		},
		// Use absolute asset paths (/_app/...) so relative URL resolution can't
		// break when the page URL's "directory depth" doesn't match what prerender
		// assumed. Notably: Paraglide emits locale-home links as /sv/ (with
		// trailing slash), which makes relative ./_app/... resolve to /sv/_app/...
		// and 404. Absolute paths sidestep this entirely.
		paths: {
			relative: false
		}
	}
};

export default config;
