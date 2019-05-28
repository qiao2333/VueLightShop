// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' // 引入iview依赖
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import 'iview/dist/styles/iview.css' // 引入iview css样式
import 'es6-promise/auto'
import store from './store'


Vue.config.debug = true
Vue.use(iView) //使用iview组件 
Vue.config.productionTip = false
axios.defaults.baseURL = '/api'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials=true;
Vue.prototype.$qs = qs;                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.prototype.$axios = axios;         //axios结合vue-axios使用
Vue.prototype.$VueAxios = VueAxios;


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
