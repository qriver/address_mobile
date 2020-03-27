import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import { Loading } from 'vant';

//导入封装的基于axios的业务接口,
import api from './api';
import { $toast } from '@/assets/common/common.js';
// import '@/assets/style/my-icon.css';

// 全局注册

Vue.use(Loading);
Vue.prototype.$api = api;
Vue.prototype.$toast = $toast;

//模拟接口,正式发布时注释
// eslint-disable-next-line no-undef
require('./mock/mock.js');

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  var isLogin = store.state.user.user_id;
  if (!isLogin) {
    if (to.path !== '/login') {
      //跳转到登录页
      return next({ path: '/login' });
    } else {
      next();
    }
  } else {
    // if (to.path === '/login') {
    //   //跳转到首页
    //   return next({ path: '/index' });
    // }else{
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
