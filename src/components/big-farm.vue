<template>
    <div>
      <div class="bigfarm__overlay"></div>

      <div class="bigfarm__window" :class="{ 'd-none': !canShow }">
        <div class="d-flex">
          <div class="flex-grow-1 p-2 m-0 align-middle outline-1px"><strong>{{ t('subscription_general_head') }}</strong></div>
          <div class="col-4 h-100 d-flex p-1">
            <div class="flex-grow-1 btn btn-secondary btn-toggle outline-1px" :class="{ active: page === 2 }" @click="goToPage(page === 2 ? 1 : 2)">{{ t('subscription_general_GuideButton') }}</div>
            <button type="button" class="ml-3 mr-1 position-relative close" style="width: 1em; opacity: 1;" aria-label="Close" @click="closeWindow()">
              <img class="position-absolute" style="top: -2px; right: -2px; width: 32px; cursor: pointer;" :src="require('@/assets/images/bigfarm__close_button.svg')" alt="X"/>
            </button>
            <div class="d-none bigfarm__window_buttons">
            </div>
          </div>
        </div>

          <!--============================================================

          =============================================================-->
          <div class="bigfarm__window_inner">
            <span class="bigfarm__fit_height" :class="{ 'd-none': !isPageActive(1)}">
              <div class="row bigfarm__intro_text">
                <div class="col">
                  <p>{{ t('subscription_general_copy') }}</p>
                </div>
              </div>

              <div class="row bigfarm__grow">
                <div class="col-4" v-if="individualPackage">
                  <individual-subscription
                          :plan="individualPackage"
                          :text="text"
                  ></individual-subscription>
                </div>
                <div class="col-4" v-if="alliancePackage">
                  <alliance-subscription
                          :plan="alliancePackage"
                          :text="text"
                          @go-to-bonus-list="goToPage(3)"
                  ></alliance-subscription>
                </div>
                <div class="col-4" v-if="enthusiastPackage">
                  <enthusiast-subscription
                          :plan="enthusiastPackage"
                          :text="text"
                          @go-to-bonus-list="goToPage(4)"
                  ></enthusiast-subscription>
                </div>
              </div>
            </span>

            <span class="bigfarm__fit_height" :class="{ 'd-none': !(isPageActive(2) || isPageActive(3) || isPageActive(4))}">
            <span :class="{ 'd-none': !(isPageActive(2) || isPageActive(3) || isPageActive(4))}">
              <subscription-status
                      :subscriptions="payoutTypes"
                      :text="text"
              ></subscription-status>
            </span>

              <subscription-guide
                      v-if="isPageActive(2)"
                      :text="text"
              ></subscription-guide>

              <alliance-bonus-list
                      v-if="isPageActive(3)"
                      :plan="alliancePackage"
                      :text="text"
                      @go-to-bonus-list="goToPage(1)"
              ></alliance-bonus-list>

              <enthusiast-bonus-list
                      v-if="isPageActive(4)"
                      :plan="enthusiastPackage"
                      :text="text"
                      @go-to-bonus-list="goToPage(1)"
              ></enthusiast-bonus-list>

            </span>
          </div>
      </div>
    </div>
</template>

<script>
  // CHECK
  import IndividualSubscription from "./individual-subscription";
  import AllianceSubscription from "./alliance/alliance-subscription";
  import AllianceBonusList from "./alliance/alliance-bonus-list";
  import EnthusiastSubscription from "./enthusiast/enthusiast-subscription";
  import EnthusiastBonusList from "./enthusiast/enthusiast-bonus-list";
  import SubscriptionGuide from "./subscription-guide";
  import SubscriptionStatus from "./subscription-status";
  import enthusiastSubscription from "./enthusiast/enthusiast-payout.json";

  import 'swiper/dist/css/swiper.css';
  import simplebar from 'simplebar-vue';
  import 'simplebar/dist/simplebar.min.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import {isAllianceSubscription, isEnthusiastSubscription, isIndividualSubscription} from "./big-farm.helpers";

  const decodeHtml = require('he').decode

    /**
    * sets window.location.query, which is a hash with all parameters
    * param names are all lowercase
    * reference as window.location.query.myparameter
    */
    ;(function parseWindowLocationQuery(w){
      var d=decodeURIComponent,
          q=w.location.query=w.location.query||{},
          pairs=w.location.search.substr(1).split('&'),
          i;
      while(i=pairs.pop()) {
        var keyValue=i.match(/([^=]*)=?(.*)/);
        if(keyValue) q[d(keyValue[1]).toLowerCase()]=d(keyValue[2]);
      }
    })(window);
    const locale = window.location.query.language || window.location.query.locale || 'en';
    if(numeral.locales[locale]) numeral.locale(locale);
    moment.locale(locale);

    export default {
        name: 'BigFarm',
        components: {
            swiper,
            swiperSlide,
            simplebar,
            IndividualSubscription,
            AllianceSubscription,
            AllianceBonusList,
            EnthusiastSubscription,
            EnthusiastBonusList,
            SubscriptionGuide,
            SubscriptionStatus,
        },
        data: () => ({
          apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
          ping: {
            gameId: window.location.query.gameid || 15,
            networkId: window.location.query.networkid || 1,
            instanceId: window.location.query.instanceid || 251,
            playerId: window.location.query.playerid || 2794098
          },
          sessionId: window.location.query.sid || Math.random().toString(36).substr(2),
          locale: window.location.query.locale || 'en',
          payoutTypes: [],
          text: {},
          currentSubscriptionTab: 'subscription_infoDialogue_general_header',
          page: 1
        }),

        computed: {
          individualPackage() {
            return this.payoutTypes.find(isIndividualSubscription);
          },
          alliancePackage() {
            return this.payoutTypes.find(isAllianceSubscription);
          },
          enthusiastPackage() {
            return this.payoutTypes.find(isEnthusiastSubscription);
          },
          catalogUrl() {
            return [
              this.apiBaseUrl,
              this.ping.gameId,
              this.ping.networkId,
              this.ping.instanceId,
              this.ping.playerId
            ].join('/')+`?sid=${this.sessionId}&locale=${this.locale}`
          },

          canShow() {
            return this.text['subscription_general_head'] !== undefined
          },

          isPageActive() {
            return (nr) => this.page == nr
          },
        },

        methods: {
          closeWindow() {
            window.parent.postMessage({
              name: 'cxf.subscriptions.close',
              frameId: window.location.query.elementid
            }, '*');
          },

          goToPage(page) {
              this.page = page;
          },

          changeTab(id){
            this.currentSubscriptionTab = id;
            this.$refs.descriptionText.scrollTo(0, 0);
          },

          t(id, ...args) {
            const text = (args || []).reduce((result, arg, index) => {
              return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
            }, this.text[id] || id);
            return decodeHtml(text)
          },

          fetchSubscriptionData() {
            fetch(this.catalogUrl)
              .then(response => response.json())
              .then(({i18n, payoutTypes}) => {
                this.text = i18n;
                this.payoutTypes = [
                    ...payoutTypes,
                    enthusiastSubscription,
                ];
              })
          }
        },

        created() {
          this.fetchSubscriptionData();
          window.addEventListener('message', event => {
            console.log('event received', event);
            if (event.data !== 'ggs.subscriptions.update') {
              return
            }
            this.fetchSubscriptionData()
          })
        }
    }
</script>

<style lang="scss">
  .bigfarm__pack_single img {
    width: 4ex;
    height: 4ex;
  }

  .bigfarm__pack_single {
    padding-bottom: 0.5ex;
  }

  .bigfarm__pack_single .description,
  .bigfarm__pack_single .dummy-img {
    display: inline-block;
  }

  .bigfarm__pack_single .description {
    margin-left: 2ex;
  }

  a:focus,
  button:focus {
    outline: none
  }
</style>
