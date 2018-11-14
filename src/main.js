import Vue from 'vue'
import App from './App.vue'

import './assets/scss/main.scss'

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

new Vue({
  render: h => h(App)
}).$mount('#app')
