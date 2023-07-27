const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: config => {
    config.plugins =  [
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
  publicPath: './', // 设置资源文件的根路径
  devServer: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
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
  }
})
