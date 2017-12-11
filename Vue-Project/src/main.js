// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import apps from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
window.itapp = new Vue({
  el: '#app',
  router:router,
  template: '<apps/>',
  components: { apps }
})