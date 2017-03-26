const webpack = require('webpack');
const path = require("path");
const externals = require("./externals");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        'app': [
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:3456',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            './ui/ts/index.tsx'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../js'),
        publicPath: "http://localhost:3456/"
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['react-hot-loader/webpack', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            }
        ]
    },
    externals,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 3456,
        hot: true
    }
};
