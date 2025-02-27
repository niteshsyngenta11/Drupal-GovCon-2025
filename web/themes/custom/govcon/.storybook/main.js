/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const path = require('path');

const config = {
  stories: ["../components/**/*.mdx", "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    // "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                  implementation: require.resolve("sass")
                }
              },
            ],
          },
        ]
      }
    }
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../assets'],
  webpackFinal: async(config) => {
    config.module.rules.push(
      {
        test: /\.twig$/,
        use: "twigjs-loader",
      },
      {
        test: /\.ya?ml$/,
        use: "yaml-loader",
      }
    );
    const alises = {
      "@atoms": path.resolve(__dirname, '../', 'components/atoms'),
      "@molecules": path.resolve(__dirname, '../', 'components/molecules'),
      "@organisms": path.resolve(__dirname, '../', 'components/organisms'),
      "@templates": path.resolve(__dirname, '../', 'components/templates'),
      "@pages": path.resolve(__dirname, '../', 'components/pages'),
      "bootstrap": path.resolve(__dirname, '../', 'node_modules/bootstrap'),
      "assets": path.resolve(__dirname, '../', 'assets'),
      "lite-youtube-embed": path.resolve(__dirname, '../', 'node_modules/lite-youtube-embed'),
    };
    Object.assign(config.resolve.alias, alises);
    return config;
  }
};
export default config;
