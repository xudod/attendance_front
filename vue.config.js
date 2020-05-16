const path = require('path')

module.exports = {
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_URL + '/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  },
  configureWebpack: {
    // 在webpack的名称字段中提供应用程序的标题，以便可以在index.html中对其进行访问以注入正确的标题。
    name: '',
    resolve: {
      alias: {
        // @代表 src/这个路径
        '@': resolve('src')
      }
    }
  }
}

function resolve(dir) {
  return path.join(__dirname, dir)
}
