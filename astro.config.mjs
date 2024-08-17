import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import tunnel from "astro-tunnel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), tunnel()],
  site: 'https://sparcles.dev'
});