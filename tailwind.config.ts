import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					gold: '#FECB00',
					navy: '#121F2B',
					teal: '#004D66',
					'med-teal': '#007399',
					cream: '#F4F2E6'
				},
				text: {
					dark: '#202F5B'
				},
				link: '#1CB67D'
			},
			fontFamily: {
				display: ['GreycliffCF', 'system-ui', 'sans-serif'],
				sans: ['Apercu', 'system-ui', 'sans-serif'],
				serif: ['"Tiempos Text"', 'Georgia', 'serif']
			}
		}
	},
	plugins: [typography]
} satisfies Config;
