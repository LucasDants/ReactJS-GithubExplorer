const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'] // extensões entendidas
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        hot: true
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module: { // configurações de como a aplicação vai se comportar, quando importar cada tipo de arquivo
        rules: [
            {
                test: /\.(j|t)sx$/, //expressão regular para saber se o arquivo é js ou n
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                } //integra webpack e babel
            },
            {
                test: /\.scss$/, //expressão regular para saber se o arquivo é js ou n
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'] //integra webpack e babel
            }
        ]
    }
}