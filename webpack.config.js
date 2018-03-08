const path = require("path");
module.exports = {
    entry: {
        "notebook": "./static/components/notebooks.js",
        "notebook_create": "./static/components/notebook_create.js",
        "notebook_by_id": "./static/components/notebook_by_id.js",
    },
    output: {
        path: path.resolve(__dirname, "static"),
        filename: "js/bundles/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
            ]
    }
};