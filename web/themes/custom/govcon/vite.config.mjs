import { defineConfig } from "vite";
import twig from "vite-plugin-twig-drupal";
import yaml from "@rollup/plugin-yaml";
import { join } from "node:path"

export default defineConfig({
  plugins: [
    yaml(),
    twig({
      namespaces: {
        atoms: join(__dirname, "/component/atoms"),
        molecules: join(__dirname, "/component/molecules"),
        organisms: join(__dirname, "/component/organisms"),
        templates: join(__dirname, "/component/templates"),
        pages: join(__dirname, "/component/pages"),
      },
    }),
  ],
});
