const localUrl = 'http://192.168.0.33:39091';
const dlUrl = 'http://user.weilaicheng.com/';
// const mockUrl = 'http://mock.kuaipeilian.com/mock/5c90c6ab3b996f25034ac5ad/cards';

module.exports = {
  devServer: {
    open: true,
    port: 8866,
    proxy: {
      '/api': {
        target: dlUrl,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
    },
    performance: {
      hints: false,
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme',
        ],
      },
    },
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
};
