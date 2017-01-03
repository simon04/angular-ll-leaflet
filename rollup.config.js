var pkg = require('./package.json');
var banner =
`/**
 * ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */`;

export default {
  sourceMap: true,
  format: 'umd',
  exports: 'named',
  banner: banner,
  moduleName: 'angular-ll-leaflet',
  entry: './src/index.js',
  dest: './dist//angular-ll-leaflet.js',
  globals: {
    angular: 'angular',
    leaflet: 'L'
  },
  external: ['angular', 'leaflet']
};
