const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const CompressionPlugin = require('compression-webpack-plugin');

const paths = require('./paths');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isEnvProduction = NODE_ENV === 'production';

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx'
];
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const publicPath = isEnvProduction ? paths.servedPath : '/';

const dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    NODE_ENV !== 'test' && `${paths.dotenv}.local`,
    paths.dotenv
];
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv-expand')(
            require('dotenv').config({
                path: dotenvFile
            })
        );
    }
});

const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
    const raw = Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                NODE_ENV: NODE_ENV || 'development',
                // Useful for resolving the correct path to static assets in `public`.
                // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
                // This should only be used as an escape hatch. Normally you would put
                // images into the `src` and `import` them in code to get their paths.
                PUBLIC_URL: publicUrl
            }
        );
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {})
    };

    return { raw, stringified };
}
const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : '';
const env = getClientEnvironment(publicUrl);
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isEnvProduction ? { loader: MiniCssExtractPlugin.loader } : require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: cssOptions
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009'
                        },
                        stage: 3
                    }),
                    postcssNormalize()
                ],
                sourceMap: isEnvProduction && shouldUseSourceMap
            }
        }
    ];

    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: isEnvProduction && shouldUseSourceMap
                }
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: isEnvProduction && shouldUseSourceMap
                }
            }
        );
    }
    return loaders;
};

module.exports = {
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    entry: [
        !isEnvProduction && require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appIndexJs
    ].filter(Boolean),
    // eslint-disable-next-line no-nested-ternary
    devtool: isEnvProduction
        ? shouldUseSourceMap
            ? 'source-map'
            : false
        : 'cheap-module-source-map',
    output: {
        publicPath,

        path: isEnvProduction ? paths.appBuild : undefined,
        pathinfo: !isEnvProduction,
        filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        chunkFilename: isEnvProduction
            ? 'static/js/[name].[contenthash:8].chunk.js'
            : 'static/js/[name].chunk.js'
    },
    optimization: {
        minimize: isEnvProduction,
        splitChunks: {
            chunks: 'all',
            name: false
        },
        runtimeChunk: true,
        minimizer: [
            // This is only used in production mode
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                },
                cache: true,
                sourceMap: isEnvProduction && shouldUseSourceMap
            }),
            // This is only used in production mode
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: shouldUseSourceMap ? { inline: false, annotation: true } : false
                }
            })
        ]
    },
    resolve: {
        extensions: moduleFileExtensions.map(ext => `.${ext}`),
        modules: ['node_modules', paths.appNodeModules],
        alias: {
            '<components>': path.resolve(paths.appSrc, 'components'),

            '<containers>': path.resolve(paths.appSrc, 'containers'),
            '<store>': path.resolve(paths.appSrc, 'store'),

            '<assets>': path.resolve(paths.appSrc, 'assets'),

            '<utils>': path.resolve(paths.appSrc, 'utils'),

            '<services>': path.resolve(paths.appSrc, 'services'),
            '<constants>': path.resolve(paths.appSrc, 'constants')
        }
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                            resolvePluginsRelativeTo: __dirname
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: paths.appSrc
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    // Process application JS with Babel.
                    // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve('babel-preset-react-app/webpack-overrides'),

                            plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                                            }
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: isEnvProduction,
                            compact: isEnvProduction
                        }
                    },
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    { helpers: true }
                                ]
                            ],
                            cacheDirectory: true,
                            cacheCompression: isEnvProduction,
                            sourceMaps: false
                        }
                    },
                    {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction && shouldUseSourceMap
                        }),
                        sideEffects: true
                    },
                    {
                        test: /\.module\.css$/,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction && shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        })
                    },
                    {
                        test: /\.(scss|sass)$/,
                        exclude: /\.module\.(scss|sass)$/,
                        use: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: isEnvProduction && shouldUseSourceMap
                            },
                            'sass-loader'
                        )
                    },

                    {
                        test: /\.module\.(scss|sass)$/,
                        use: getStyleLoaders(
                            {
                                importLoaders: 2,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent
                            },
                            'sass-loader'
                        )
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                    // ** STOP ** Are you adding a new loader?
                    // Make sure to add the new loader(s) before the "file" loader.
                ]
            }
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            ...(isEnvProduction
                ? {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true
                    }
                }
                : undefined)
        }),
        isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        new ModuleNotFoundPlugin(paths.appPath),
        new webpack.DefinePlugin(env.stringified),
        !isEnvProduction && new webpack.HotModuleReplacementPlugin(),
        !isEnvProduction && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        isEnvProduction &&
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath,
            generate: (seed, files) => {
                const manifestFiles = files.reduce(function (manifest, file) {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);

                return {
                    files: manifestFiles
                };
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            exclude: [/\.map$/, /asset-manifest\.json$/],
            importWorkboxFrom: 'cdn',
            navigateFallback: publicUrl + '/index.html',
            navigateFallbackBlacklist: [new RegExp('^/_'), new RegExp('/[^/?]+\\.[^/]+$')]
        }),
        isEnvProduction && new CompressionPlugin()
    ].filter(Boolean),
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    performance: false,
    devServer: {
        overlay: false,
        historyApiFallback: {
            disableDotRule: true
        },
        contentBase: paths.appPublic
    }
};
