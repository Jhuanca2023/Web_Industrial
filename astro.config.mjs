// @ts-check
import { defineConfig } from 'astro/config';

// Static output: Netlify serves the whole template without server functions.
export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
});
