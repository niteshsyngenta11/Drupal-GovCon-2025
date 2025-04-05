const mix = require('laravel-mix');
const glob = require('glob');
const path = require('path');

mix.webpackConfig({
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'components/atoms'),
      '@molecules': path.resolve(__dirname, 'components/molecules'),
      '@organisms': path.resolve(__dirname, 'components/organisms'),
      '@templates': path.resolve(__dirname, 'components/templates'),
      '@pages': path.resolve(__dirname, 'components/pages'),
      '@base': path.resolve(__dirname, 'components/base'),
      'assets': path.resolve(__dirname, 'assets'),
    }
  }
});

mix.setPublicPath('dist');

mix.copy('assets/', 'dist/assets/', false);
// copy fonts to use the icons on component level.
mix.copy('assets/fonts', 'dist/components/assets/fonts', false);

mix.options({
  processCssUrls: false,
});
mix.disableNotifications()

glob.sync('components/**/**/*.js').forEach((sourcePath) => {
  if (sourcePath.includes(".stories.js")) return;
  const destinationPath = sourcePath.replace(
    /^src\/(components\/.+)\/(.+)\.js$/,
    '$1/$2.js'
  );

  mix.js(sourcePath, destinationPath);
});

glob.sync('components/**/**/*.scss').forEach((sourcePath) => {
  const fileName = path.basename(sourcePath);
  const isPartial = fileName.startsWith('_');
  if (isPartial) return;

  const destinationPath = sourcePath.replace(
    /^components\/(.+)\.scss$/,
    'components/$1.css'
  );

  mix.sass(sourcePath, destinationPath)
    .sourceMaps(false, 'source-map')
});
