const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

process.env.webpack = true; //eslint-disable-line

module.exports = () => {
    return {
        devtool: 'eval-source-map',
        entry: { cli: './src/bin/sonarwhal' },
        externals: {
            // './version': 'commonjs2 ./version',
            browserslist: 'commonjs browserslist',
            encoding: 'commonjs encoding',
            'require-uncached': 'commonjs require-uncached',
            'update-notifier': 'commonjs update-notifier'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{ loader: 'ts-loader' }]
                },
                {
                    loader: 'handlebars-template-loader',
                    test: /\.hbs$/
                }
            ]
        },
        node: {
            __dirname: false,
            __filename: false,
            path: true,
            process: false
        },
        output: { filename: '[name].bundle.js' },
        plugins: [
            new webpack.ProgressPlugin(),
            new ForkTsCheckerWebpackPlugin(),
            new webpack.DefinePlugin({ 'process.env.webpack': JSON.stringify(true) })
        ],
        resolve: {
            alias: { handlebars: 'handlebars/dist/handlebars.js' },
            extensions: ['.ts', '.wasm', '.mjs', '.js', '.json']
        },
        target: 'node'
    };
};
