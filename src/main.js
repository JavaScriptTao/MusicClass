import Vue from 'vue';
import FastClick from 'fastclick';
import 'amfe-flexible';
import {
  Style,
  TabBar,
  TabPanels,
  Scroll,
  Slide,
  Swipe,
} from 'cube-ui';
// 神策
import '@/tool/buriedPoint';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.use(TabBar);
Vue.use(TabPanels);
Vue.use(Scroll);
Vue.use(Slide);
Vue.use(Swipe);

Vue.config.productionTip = false;

// 添加Fastclick移除移动端点击延迟
FastClick.attach(document.body);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    const head = document.getElementsByTagName('head');
    const meta = document.createElement('meta');
    meta.content = to.meta.content;
    head[0].appendChild(meta);
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
