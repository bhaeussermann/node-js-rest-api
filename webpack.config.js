const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    entry: './src/server.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()],
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
                exclude: ['/node_modules/'],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    mode: isProduction ? 'production' : 'development'
};
