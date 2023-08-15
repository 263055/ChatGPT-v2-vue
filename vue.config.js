const {defineConfig} = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    configureWebpack: config => {
        config.plugins = [
            ...config.plugins,
            new NodePolyfillPlugin()
        ]
        config.experiments = {
            syncWebAssembly: true
        }
        // 非Node环境下去掉electron模块
        if (!process.env.IS_ELECTRON) {
            config.externals = {
                electron: 'commonjs2 electron',
            }
        }
    },
    transpileDependencies: true,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 设置资源文件的根路径
    devServer: {
        client: {
            overlay: false
        },
        host: '0.0.0.0',
        port: 5173,
        open: true,
        // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
        historyApiFallback: {
            index: '/index.html' //与output的publicPath
        },
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/api': {
                target: `http://localhost:8081`,
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        },
        hot: true//自动保存
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            customFileProtocol: "./",
            mainProcessFile: 'src/background.js',
            builderOptions: {
                appId: 'com.example.app',
                productName: 'ChatGPT-v2',
                win: {
                    icon: './public/app.ico'
                },
                mac: {
                    icon: './public/app.icns'
                }
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config.when(process.env.NODE_ENV !== 'development', config => {
            config.optimization.runtimeChunk('single'),
                {
                    from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
                    to: './' //到根目录下
                }
        })
    }
})
