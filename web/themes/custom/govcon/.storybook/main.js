import path from "path";
import { glob } from "glob";

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  stories: [
    "../component/**/*.mdx",
    "../component/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: ["@storybook/addon-essentials"],
  viteFinal: async (config) => {
    const aliases = {
      "@atoms": path.resolve(__dirname, "../component/atoms"),
      "@molecules": path.resolve(__dirname, "../component/molecules"),
      "@organisms": path.resolve(__dirname, "../component/organisms"),
      "@templates": path.resolve(__dirname, "../component/templates"),
      "@pages": path.resolve(__dirname, "../component/pages"),
      "assets": path.resolve(__dirname, "../assets"),
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
    };

    // Generate CSS files is dist folder
    const scssFiles = glob.sync("component/**/*.scss");
    const outputPaths = scssFiles.map((sourcePath) => {
      const relativePath = path.relative(path.resolve(__dirname, "../"), sourcePath);
      return path.join("", relativePath.replace(/\.scss$/, ".css"));
    });
    config.build = {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith(".css")) {
              const matchedPath = outputPaths.find((p) => p.endsWith(assetInfo.name));
              return matchedPath || `[name][extname]`;
            }
            return "[name]-[hash][extname]";
          },
        },
      },
    };

    return config;
  },
};

export default config;
