/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                // Monochrome base + single accent
                custom_body: '#05050A',
                custom_components: '#0B0B12',
                card: '#0E0E16',
                border: '#1B1B28',
                // Electric cyan + amber (avoid purple)
                accent: '#00D1FF',
                accentSoft: '#FFB020'
            },
            fontFamily: {
                // Keep keys stable across the project; update families.
                sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
                systemui: ['system-ui', 'sans-serif'],
                jbmono: ['"JetBrains Mono"', 'monospace'],
                montserrat: ['Oxanium', '"IBM Plex Sans"', 'sans-serif'],
            },
        },
	},
	plugins: [require('tailwind-hamburgers')],
}
