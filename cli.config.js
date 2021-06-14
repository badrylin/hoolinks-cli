
module.exports = {
    webpack: {
        cache: false,
    },
    devServer: {
        open: false,
    },
    babelOptions: {
        presets: [],
        plugins: [
            ["import", { "libraryName": "antd", "style": true}, "antd"],
        ]
    }
}
