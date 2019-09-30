const CompressionWebpackPlugin = require('compression-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['html', 'js', 'css'];

const path = require('path')
const isProduction = process.env.NODE_ENV === 'production' ? true : false
const BASE_URL = isProduction === 'production' ? './' : '/';

// 本地环境是否需要使用cdn
const devNeedCdn = false
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    // 'axios': 'axios',
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT'
  },
  // cdn的css链接
  css: [
    'https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css'
  ],
  // cdn的js链接
  js: [
    // 'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/element-ui/2.12.0/index.js'
  ]
}

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  // assetsDir: 'static', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  lintOnSave: false,
  productionSourceMap: false, // 开启生产环境的 source map?
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,
  css: {
    modules: false, // 启用 CSS modules
    extract: true, // 是否使用css分离插件,生产环境下是 true，开发环境下是 false
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项将传递给css-loader
      },
      postcss: {
        // 这里的选项将传递给postcss-loader
      }
    }
  },
  devServer: {
    open: false, // 是否立刻打开
    host: '127.0.0.1', // 本地域名
    port: 9999, // 端口
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/iot': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true, //是否跨域
      }
    }
  },
  chainWebpack: config => {
    // 注入cdn
    /* config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (devNeedCdn || isProduction) args[0].cdn = cdn;
      return args;
    }) */
    if (isProduction) {
      // 移除 prefetch 插件
      config.plugins.delete("prefetch");
      // 移除 preload 插件
      config.plugins.delete('preload');
    }
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    // if (devNeedCdn || isProduction) config.externals = cdn.externals;
    if (isProduction) {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 打包生产.gz包
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理10240=10kb
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }),

        // 去除console.log与警告
        new terserWebpackPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      )

      // 将每个依赖包打包成单独的js文件
      let optimization = {
        splitChunks: {
          chunks: 'all', //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
          minSize: 300000, // 依赖包超过30000bit将被单独打包
          maxAsyncRequests: 5, // 所有异步请求不得超过5个
          maxInitialRequests: 3, // 一个入口最大的并行请求数，默认为3
          minChunks: 1, // 最少被引用次数
          // 自定义配置决定生成的文件,缓存策略
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // 获取插件名称
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `${packageName.replace('@', '')}`
              },
              priority: 100, // 权重
            },
            common: {
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              priority: 60,
            },
            styles: {
              chunks: 'all',
              test: /\.(sa|sc|c)ss$/,
              name: 'styles',
            },
            // 是将包含chunks映射关系的list单独从app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
            runtimeChunk: {
              name: 'manifest'
            }
          }
        }
      }
      Object.assign(config, {
        optimization
      })
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  pwa: {

  }
}
