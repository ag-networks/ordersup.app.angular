/**
 * @author: @AngularClass
 */

var path = require('path');

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
const autoprefixer = require('autoprefixer');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');



// bootstrap-loader
// https://github.com/shakacode/bootstrap-loader
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config();

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'Orders Up',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * You can pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   */
   //cache: false,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':      './src/main.browser.ts',

    //'bootstrap' : './node_modules/bootstrap-loader'

  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss','.html'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules'],

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /*
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
          flags: 'g'
        },
        include: [helpers.root('src')]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/bootstrap'),
          helpers.root('node_modules/@angular'),
        ]
      }

    ],

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [

      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       * Replace templateUrl and stylesUrl with require()
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       * See: https://github.com/TheLarkInn/angular2-template-loader
       */
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      /*
       * to string and css loader support for *.css files
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },

      /* File loader for supporting images, for example, in CSS files.
      */
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file'
      },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
      //{ test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },

      //{
      //  test: /\.scss$/,
      //  exclude: /node_modules/,
      //  loaders: ['raw-loader', 'sass-loader']
      //},

      //{ test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass', 'raw-loader', 'sass-loader'] },
      { test: /\.scss$/, loaders: ['raw-loader','postcss', 'sass-loader'] },
      //{
      //  test: /\.scss$/,
      //  loaders: ['style', 'css', 'postcss', 'sass']
      //},

      // https://github.com/AngularClass/angular2-webpack-starter/wiki/How-to-use-Bootstrap-4-and-Sass-(and-jQuery)

      //{
      //  test: /[\/\\]node_modules[\/\\]jquery[\/\\]dist[\/\\]jquery\.js$/,
      //  loader: "expose",
      //  query: {
      //    jQuery: true,
      //    $: true
      //  }
      //},
      { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
      { test: /[\/\\]node_modules[\/\\]tether[\/\\]dist[\/\\]js[\/\\]tether\.js$/, loader: "expose?tether" },
      { test: /[\/\\]node_modules[\/\\]jquery[\/\\]dist[\/\\]jquery\.js$/, loader: "expose?jQuery" },
      //{ test: /[\/\\]node_modules[\/\\]jquery[\/\\]dist[\/\\]jquery\.js$/, loader: "expose?$!expose?jQuery" },
      //{ test: /[\/\\]node_modules[\/\\]jquery[\/\\]dist[\/\\]jquery\.js$/, loader: "expose?$!expose?jQuery" },

      // this works
      //{ test: /[\/\\]node_modules[\/\\]bootstrap[\/\\]dist[\/\\]js[\/\\]dist[\/\\]bootstrap\.js$/, loader: "imports?jQuery=jquery!lappin=lappin" }
      //{ test: /[\/\\]bootstrap[\/\\]dist[\/\\]js[\/\\]dist[\/\\]bootstrap\.js$/, loader: "imports?jQuery" }

      //{ test: /node_modules\/bootstrap\/dist\/js\//, loader: 'imports?jQuery=jquery' },
      //{ test: /node_modules\/bootstrap\/dist\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /bootstrap\/dist\/js\//, loader: 'imports?jQuery' },

    ]

  },
  postcss: [autoprefixer], // removed this after upgrade to node6

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),
    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),


    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    /*
     * Plugin: HtmlHeadConfigPlugin
     * Description: Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     * Example:
     *  Adding this plugin configuration
     *  new HtmlElementsPlugin({
     *    headTags: { ... }
     *  })
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),

    new webpack.ProvidePlugin({
      //lappin: 'jQuery310071983265147134761',
      jQuery: 'jQuery',
      $: 'jquery',
      jquery: 'jQuery',
      'Tether': 'tether',
      'window.Tether': 'tether'
      //Cookies: 'js-cookie'
    }),

    // bootstrap-loader
    // https://github.com/shakacode/bootstrap-loader
    //new ExtractTextPlugin('app.css', { allChunks: true }),

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
