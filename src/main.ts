import Vue from 'vue'

import './assets/scss/main.scss'
import BigFarm from './components/big-farm.vue'
import StatusChangedModal from './components/status-changed.vue'
import * as moment from "moment";
import SubscriptionLoyaltyBonus from "@/components/enthusiast/subscription-loyalty-bonus.vue";
import {prepareGlobalVars} from "@/prepareGlobalVars";
import {dataProvider} from "@/services/dataProvider";

Vue.config.productionTip = false;
Vue.use(require('vue-moment'), {moment});

const NotFound = {template: '<p>Page not found</p>'};

if (process.env.VUE_APP_ANALYTICS_KEY) {
    window.analytics.load(process.env.VUE_APP_ANALYTICS_KEY);
    window.analytics.page();
}

const routes = {
    '/': BigFarm,
    '/subscriptionStatusChange': StatusChangedModal,
    '/loyalty-bonus': SubscriptionLoyaltyBonus
} as any;

prepareGlobalVars(window);
const {
    gameid = 15,
    networkid = 1,
    instanceid = 251,
    playerid = 2794098,
    sid = Math.random().toString(36).substr(2),
    locale = 'en'
} = (window.location as any).query;
dataProvider.catalogUrl = [
    process.env.VUE_APP_API_BASE_URL,
    gameid,
    networkid,
    instanceid,
    playerid,
].join('/')+`?sid=${sid}&locale=${locale}`;

new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            return (routes[this.currentRoute] || NotFound) as any
        }
    },
    render(h) {
        return h((this as any).ViewComponent as any)
    }
}); //.$mount('#app')
