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
        historyApiFallback: {
            rewrites: [
                {from: './public/favicon.ico', to: 'favicon.ico'},
                {from: './public/manifest.json', to: 'manifest.json'}
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
        path: path.join(__dirname, "/dist"),
        filename: "./index.js",
        publicPath: "/",
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
        ],
    },
    plugins: plugins(),
};
