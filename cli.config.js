
module.exports = {
    devServer: {
        open: false,
    },
    webpack: {
        cache: false,
    },
    dllWebpack: {
        entry: {
            verdor: ["react", "react-dom"],
            lodash: ["lodash"],
        }
    },
    babelOptions: {
        presets: [],
        plugins: [
            ["import", { "libraryName": "antd", "style": true}, "antd"],
        ]
    }
}
