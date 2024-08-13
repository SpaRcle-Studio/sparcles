/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                custom_body: '#13151a',
                custom_components: '#111111',
            },
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
                mono: ['Source Code Pro', 'Menlo', 'monospace'],
                systemui: ['system-ui, sans-serif'],
                jbmono: ['"JetBrains Mono"', 'monospace'],
                montserrat: ['Montserrat', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
        },
	},
	plugins: [],
}
