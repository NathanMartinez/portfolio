import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace']
			},
			colors: {
				bg: 'var(--bg)',
				elevated: 'var(--bg-elevated)',
				panel: 'var(--panel)',
				border: 'var(--border)',
				text: 'var(--text)',
				muted: 'var(--text-muted)',
				subtle: 'var(--text-subtle)',
				accent: 'var(--accent)',
				'accent-hover': 'var(--accent-hover)'
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)'
			},
			boxShadow: {
				soft: 'var(--shadow-soft)'
			}
		}
	},
	plugins: []
} satisfies Config;
