// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://varsha.de",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
});
