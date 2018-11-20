import Vue from 'vue'

import './assets/scss/main.scss'

Vue.config.productionTip = false
Vue.use(require('vue-moment'),{moment});

import BigFarm from './components/big-farm.vue'
import StatusChangedModal from './components/status-changed.vue'

const routes = {
  '/': BigFarm,
    '/subscriptionStatusChange': StatusChangedModal
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
}) //.$mount('#app')
