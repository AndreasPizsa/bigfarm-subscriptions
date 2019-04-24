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
              <div class="row bigfarm__status">
                <div class="col-4 bigfarm__status_info">
                  <img :src="isUsersIndividualSubscriptionActive
                      ? require('@/assets/images/bigfarm__status_active.svg')
                      : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
                    <span class="ml-2">{{ t('subscription_packageConvenience_title') }}</span>
                </div>
                <div class="col-4 bigfarm__status_info">
                  <img :src="isUsersAllianceSubscriptionActive
                    ? require('@/assets/images/bigfarm__status_active.svg')
                    : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
                  <span class="ml-2">{{ t('subscription_packageAlliance_title') }}</span>
                </div>
                <div class="col-4 bigfarm__status_info">
                  <img :src="isUsersAllianceSubscriptionActive
                    ? require('@/assets/images/bigfarm__status_active.svg')
                    : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
                  <span class="ml-2">{{ t('subscription_packageEnthusiast_title') }}</span>
                </div>
              </div>
            </span>

              <span class="bigfarm__grow" :class="{ 'd-none': !isPageActive(2)}">
                <div class="row h-100">
                  <div class="col-3">
                      <div class="bigfarm__pack bigfarm__pack_v2 pt-3 pb-2 mt-0 mb-0 h-100">
                      <div v-for="key in tabTitleKeys"
                            class="btn btn-secondary w-100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === key}"
                            @click="changeTab(key)">{{ t(key) }}
                      </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="bigfarm__pack bigfarm__description_text h-100 mt-0" ref="descriptionText">
                        <div
                          class="bigfarm__description_text_inner h-100" data-simplebar>
                          <div v-html="t_html(tabCopyForTitle(currentSubscriptionTab))"></div>
                        </div>
                    </div><!-- /.bigfarm__description_text -->
                  </div>
                </div>
              </span>

              <span class="bigfarm__grow" :class="{ 'd-none': !isPageActive(3)}">
                <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list bigfarm__fit_height mt-0">
                <div class="d-flex flex-row">
                  <img class="flex-shrink-1" style="cursor: pointer; bottom: -2px" :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" @click="goToPage(1)"/>
                  <span class="flex-grow-1 text-center align-middle">{{ t('subscription_allianceProgress') }}</span>
                </div>

                <div class="bigfarm__table_box">
                  <vue-scrolling-table
                    :scroll-horizontal="scrollHorizontal"
                    :scroll-vertical="scrollVertical"
                    :sync-header-scroll="syncHeaderScroll"
                    :sync-footer-scroll="syncFooterScroll"
                    :include-footer="includeFooter"
                    :dead-area-color="deadAreaColor"
                    :class="{ freezeFirstColumn }">
                    <template slot="thead">
                      <tr>
                          <th><div class="fill">{{ t('subscription_allianceBonuses') }}</div></th>
                        <th v-for="tier in alliancePackBoosterTiers">{{tier}}</th>
                      </tr>
                    </template>
                    <template slot="tbody">
                      <tr v-for="perkId in alliancePackPerks">
                        <td class="fill">
                          <div class="fill  p-2">
                            <dl>
                              <dt><div class="thumbnail"><img alt="" :src="iconNameForItemId(perkId)" width="100%" height="100%"/></div></dt>
                              <dd>
                                <h3>{{ t(textKeyForItemId(perkId).title) }}</h3>
                                <p>{{ t(textKeyForItemId(perkId).body) }}</p>
                              </dd>
                            </dl>
                          </div>
                        </td>
                        <td v-for="tier in alliancePackBoosterTiers">
                          {{ alliancePackBoosterPerkBoostForTier(perkId, tier) > 0 ? textKeyForItemId(perkId).prefix : '' }}{{ alliancePackBoosterPerkBoostForTier(perkId, tier) | xIfEmptyOrZero }}{{ alliancePackBoosterPerkBoostForTier(perkId, tier) > 0 ? textKeyForItemId(perkId).suffix : ''}}
                        </td>
                      </tr>
                    </template>
                  </vue-scrolling-table>
                </div>
              </div>
              </span>

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
    import VueScrollingTable from "vue-scrolling-table";
    import IndividualSubscription from "./subscriptions/individual-subscription";
    import AllianceSubscription from "./subscriptions/alliance-subscription";
    import EnthusiastSubscription from "./subscriptions/enthusiast-subscription";
    import EnthusiastBonusList from "./enthusiast-bonus-list";
    import enthusiastSubscription from "../data/enthusiast-payout.json";

    import 'swiper/dist/css/swiper.css';
    import simplebar from 'simplebar-vue';
    import 'simplebar/dist/simplebar.min.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
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

    function isIndividualSubscription(plan) {
      return plan.id === 'individualSubscription';
    }

    function isAllianceSubscription(plan) {
      return plan.id === 'allianceSubscription';
    }

    function isEnthusiastSubscription(plan) {
      return plan.id === 'enthusiastSubscription';
    }

    export default {
        name: 'BigFarm',
        components: {
            VueScrollingTable,
            swiper,
            swiperSlide,
            simplebar,
            IndividualSubscription,
            AllianceSubscription,
            EnthusiastSubscription,
            EnthusiastBonusList,
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

          scrollVertical: true,
          scrollHorizontal: true,
          syncHeaderScroll: true,
          syncFooterScroll: true,
          includeFooter: true,
          deadAreaColor: "transparent",
          maxRows: 4,
          freezeFirstColumn: true,

          locale: window.location.query.locale || 'en',

          subscriptions: {
            payoutTypes: [],
          },
          text: {},
          currentSubscriptionTab: 'subscription_infoDialogue_general_header',
          page: 1
        }),

        computed: {
          individualPackage() {
            return this.subscriptions.payoutTypes.find(isIndividualSubscription);
          },
          alliancePackage() {
            return this.subscriptions.payoutTypes.find(isAllianceSubscription);
          },
          enthusiastPackage() {
            return this.subscriptions.payoutTypes.find(isEnthusiastSubscription);
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
            return this.text.subscription_general_head !== undefined
          },

          isPageActive() {
            return (nr) => this.page == nr
          },

          userSubscriptionByType(){
            return (type) => (this.subscriptions.payoutTypes || []).find(e => e.id === type) || {}
          },

          isUserSubscriptionActiveByType() {
            return (type) => this.userSubscriptionByType(type).validUntil && moment().diff(this.userSubscriptionByType(type).validUntil) <= 0 || !this.userSubscriptionByType(type).checkoutUrl
          },

          isUsersIndividualSubscriptionActive() {
            return this.isUserSubscriptionActiveByType('individualSubscription')
          },

          isUsersAllianceSubscriptionActive() {
            return this.isUserSubscriptionActiveByType('allianceSubscription')
          },

          tabTitleKeys() {
            return this.tabTextKeys('header')
          },

          tabCopyKeys() {
            return this.tabTextKeys('copy')
          },

          isAllianceMember () {
            return Boolean(this.alliancePack.isAllianceMember)
          },

          alliancePack() {
            return ((this
              .subscriptions
              .payoutTypes || [])
              .find(({id}) => id === 'allianceSubscription') || {})
          },

          allianceSubscriberCount() {
            return (this.alliancePack || {}).allianceSubscriberCount || 0
          },

          alliancePackBoosterData() {
            return this.alliancePack.boosterTiers || []
          },

          // an array of all the perks included in the alliancePack
          alliancePackPerks() {
            const allPerks = this
              .alliancePackBoosterData
              .reduce((result, {items}) => ([
                ...result,
                ...(items.map(([itemId]) => itemId))
              ]), []);
            return Array.from(new Set(allPerks))
          },

          alliancePackPerksForHighlightedTier() {
            const highlightedAllianceTier = this.highlightedAllianceTier;
            const allPerks = this
              .alliancePackBoosterData
              .filter(({from}) => from <= highlightedAllianceTier)
              .reduce((result, {items}) => ([
                ...result,
                ...(items.filter(([,amount])=>amount).map(([itemId]) => itemId))
              ]), []);
            return Array.from(new Set(allPerks))
          },

          // an array of all the booster tiers in the alliancePack
          alliancePackBoosterTiers() {
            const allTiers = this
              .alliancePackBoosterData
              .reduce((set, {from}) => set.add(from), new Set());
            return Array.from(allTiers).sort((a,b) => parseInt(a) - parseInt(b))
          },

          alliancePackBoosterPerkBoostForTier(){
            return (perkId, tier) => {
              return ((this
                .alliancePackBoosterData
                .find(({from}) => from >= tier) || {})
                .items || [])
                .find(([id]) => id == perkId)
                [1]
              }
          },

          highlightedAllianceMemberCount() {
            return Math.max(
              1,
              Number(this.isAllianceMember) *
                (
                    (this.isUsersAllianceSubscriptionActive ? 0 : 1)
                  + this.allianceSubscriberCount
                )
            )
          },

          highlightedAllianceTier() {
            const items = this
                    .alliancePackBoosterData
                    .filter(({from}) => from && from <= this.highlightedAllianceMemberCount);
            return items.pop().from
          }
        },

        filters: {
            formatCurrency(value) {
              return {
                EUR: '€',
                USD: '$'
              }[value] || value
            },

            // todo format according to locale
            formatPrice(price) {
              return numeral(parseInt(price)/100).format('0,0[.]00')
            },

            xIfEmptyOrZero(value) {
              return value || '–'
            }
        },

        methods: {
          closeWindow() {
            window.parent.postMessage({
              name: 'cxf.subscriptions.close',
              frameId: window.location.query.elementid
            }, '*');
          },

          assetUrl(forWhat) {
            return `${this.subscriptions.base.assetsBaseUrl}${forWhat}`
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

          t_html(id, ...args) {
            return this
              .t(id, ...args)
              .split(/\n{2}/)
              .filter(t => t && t.trim().length > 0)
              .map(t => `<p>${t}</p>`)
              .join('')
              .replace(/\n/g, '<br/>')
          },

          t_num(idNone, idSingular, idPlural, value, ...args) {
            const id = value
              ? value == 1
                ? idSingular
                : idPlural
              : idNone;
            return this.t(id, ...[value, ...args])
          },

          tabTextKeys(suffix) {
            const exceptions = {
              'subscription_infoDialogue_multiSubscriptions_header'
                : 'dialog_subscription_multiSubscriptions_header',
              'subscription_infoDialogue_monthlyPayment_copy'
                : 'dialog_subscription_monthlyPayment_copy'
            };

            const keys =
              'general monthlyPayment multiSubscriptions cancelSubscription allianceSubscription convenienceSubscription'
              .split(/\s+/)
              .map(key => `subscription_infoDialogue_${key}_${suffix}`)
              .map(key => exceptions[key] || key);

            return keys
          },

          tabCopyForTitle(title) {
            const copyIndex = this.tabTitleKeys.indexOf(title);
            return this.tabCopyKeys[copyIndex]
          },

          itemDataForId(id) {
            return {
              72002: ['contractMaterial', '-', '%'],
              72004: ['fishcontractMaterial', '-', '%'],
              72006: ['xpBooster', '+'],
              72014: ['coopVillageConstructionCosts', '-', '%'],
              72015: ['coopVillageConstructionDuration', '-', '%'],
              72003: ['contractCash', '+', '%'],
              72005: ['fishcontractCash', '+', '%'],
              72009: ['coopResearchCost', '-', '%'],
              72010: ['coopProjectDuration', '+', '%'],
              72016: ['coopVillageBoostLumbermill', '+', '%'],
              72017: ['coopVillageBoostBrickyard', '+', '%'],
              72013: ['seasonSpecialistOutcome', '+', '%'],
              72011: ['edgePlantOutcome', '+', '%'],
              72012: ['fieldDamageReduce', '-', '%'],
              72008: ['horseTrainingCost', '-', '%'],
              72007: ['tempConstructionSlot', '-']
            }[id]
          },

          iconNameForItemId(id) {
            return 'images/' + require('lodash.snakecase')(`${this.itemDataForId(id)[0]}_med`)+'.png'
          },

          textKeyForItemId(id) {
            const itemData = this.itemDataForId(id);

            return {
              title: `subscription_perkAlliance_${itemData[0]}_title`,
              body:  `subscription_perkAlliance_${itemData[0]}_desc`,
              prefix: itemData[1] || '',
              suffix: itemData[2] || ''
            }
          },

          fetchSubscriptionData() {
            fetch(this.catalogUrl)
              .then(response => response.json())
              .then(subscriptionData => {
                this.text = subscriptionData.i18n;
                subscriptionData.payoutTypes = [
                  subscriptionData.payoutTypes.find(({id}) => id === 'individualSubscription'),
                  subscriptionData.payoutTypes.find(({id}) => id === 'allianceSubscription'),
                  enthusiastSubscription,
                ];
                this.subscriptions = subscriptionData
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

<style>
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
