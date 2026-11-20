// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site. When the school moves to its own domain,
// set SITE_URL to that domain and BASE_PATH to "/".
const site = process.env.SITE_URL ?? 'https://dineshsharma2663.github.io';
const base = process.env.BASE_PATH ?? '/rainbow-kidz-preschool';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: { responsiveStyles: true },
  vite: { plugins: [tailwindcss()] },
});
