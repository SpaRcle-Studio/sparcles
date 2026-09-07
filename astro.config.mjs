import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://sparcles.dev',
  // The page used to live at /demo, keep old links working.
  redirects: {
    '/demo': '/web-engine'
  }
});
