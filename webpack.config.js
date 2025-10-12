// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Точка входа
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    },
    module: {
    rules: [
        {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
        },
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        },
        {
        test: /\.(ttf|woff|woff2)$/i,
        type: 'asset/resource',
        },
    ],
    },
    resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    open: true,
    hot: true,
    },
    mode: 'development',
};