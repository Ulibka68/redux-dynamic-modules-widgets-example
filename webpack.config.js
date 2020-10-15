const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log(isProd);
console.log(process.env.NODE_ENV);
// console.log(process.env);

const plugins = () => {
    let base =[];
    // return base;
    base = [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon:"./public/favicon.ico"
        })
    ];
    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base;
}

module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    devServer: {
        hot: true,
        // contentBase: path.join(__dirname, 'src/assets'),
        // contentBasePublicPath: '/',
        // historyApiFallback: true
        historyApiFallback: {
            rewrites: [
                {from: /favicon.ico$/, to: 'E:/_prgs/otus/redux-dynamic-modules/packages/widgets-example/src/assets/favicon.ico'},
                {from: /manifest.json$/, to: 'E:/_prgs/otus/redux-dynamic-modules/packages/widgets-example/src/assets/manifest.json'}
            ]
        }
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            types: path.resolve(__dirname, "src/types"),
            components: path.resolve(__dirname, "src/components"),
            "@": path.resolve(__dirname, "src"),
        },
    },
    output: {
        // `path` is the folder where Webpack will place your bundles
        path: path.join(__dirname, "/dist"),
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: '[name].bundle.js',
        // filename: "./index.js",
        // `chunkFilename` provides a template for naming code-split bundles (optional)
        chunkFilename: '[name].bundle.js',
        // `publicPath` is where Webpack will load your bundles from (optional)
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.(js|ts)x?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: plugins(),
};
