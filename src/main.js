import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import toast from 'components/common/toast'
import FastClick from 'fastclick'

Vue.config.productionTip = false
//弹出显示
Vue.use(toast)
//图片懒加载
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png')
})
//解决移动端300ms的延迟
FastClick.attach(document.body)

//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
