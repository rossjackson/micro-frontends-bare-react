import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration } from 'webpack'
import 'webpack-dev-server'

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : 'style-loader'

const config: Configuration = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        watchFiles: ['index.html', 'src/**/*'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'

        config.plugins?.push(new MiniCssExtractPlugin())
    } else {
        config.mode = 'development'
        config.devtool = 'inline-source-map'
    }
    return config
}
