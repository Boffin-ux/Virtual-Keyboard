const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

const generateFileName = ext => isDev ? '[name]${ext}' : '[name].[hash]${ext}';

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: './[hash][ext][query]',
        clean: {
            keep: /\.git/,
        },
    },
    mode,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Virtual Keyboard',
            filename: 'index.html',
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        static: './dist',
        port: 8181,  // порт default 8080
        compress: true,  // сжатие gzip
        hot: isDev,  // при добавлении новых модулей сразу их подключать
        historyApiFallback: true,  // использование history HTML5
        open: true,  // открывать браузер при запуске
        client: {
            overlay: true, // оверлей при ошибках
        },
    },
    devtool: isDev && 'eval-source-map'
};