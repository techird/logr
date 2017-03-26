const webpack = require('webpack');
const path = require("path");
const externals = require("./externals");

module.exports = {
    entry: {
        'app': [
            './ui/ts/index.tsx'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../js')
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['ts-loader'],
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
        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
};
