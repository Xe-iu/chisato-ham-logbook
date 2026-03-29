// @ts-check
import { defineConfig } from "astro/config";
import minify from "astro-minify-html-swc";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [minify()],
});
