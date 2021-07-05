import Vue from 'vue'
import App from './App.vue'
import http from './http'
import './index.css'

Vue.config.productionTip = false

Vue.prototype.$http = http;

new Vue({
  render: h => h(App),
}).$mount('#app')
