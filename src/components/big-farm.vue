<template>
    <div>
      <div class="bigfarm__overlay"></div>

      <div class="bigfarm__window" :class="{ 'd-none': !canShow }">
        <div class="d-flex">
          <div class="flex-grow-1 p-2 m-0 align-middle outline-1px"><strong>{{ t('subscription_general_head') }}</strong></div>
          <div class="col-4 h-100 d-flex p-1">
            <div class="flex-grow-1 btn btn-secondary btn-toggle outline-1px" :class="{ active: page === 2 }" @click="goToPage(page === 2 ? 1 : 2)">{{ t('subscription_general_GuideButton') }}</div>
            <button type="button" class="ml-3 mr-1 position-relative close" style="width: 1em; opacity: 1;" aria-label="Close">
              <img class="position-absolute" style="top: -2px; right: -2px; width: 32px; cursor: pointer;" :src="require('@/assets/images/bigfarm__close_button.svg')" alt="X" @click="closeWindow()"/>
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
                <div class="col-6" v-for="plan in subscriptions.payoutTypes">
                  <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__convenience_pack bigfarm__fit_height">
                    <div class="bigfarm__pack_inner bigfarm__fit_height">
                      <h2>{{
                          t(plan.id == 'individualSubscription'
                            ? 'subscription_packageConvenience_title'
                            : 'subscription_packageAlliance_title'
                          )
                      }}</h2>
                      <div class="bigfarm__hero_visual" :class="plan.id" :style="{
                              'background-image': 'url(' + require(`@/assets/images/hero-${plan.id}.jpg`) + ')',
                              'background-size': 'cover'
                            }"
                        ></div>
                      <div class="bigfarm__shade_brown fullwidth">
                        <h4>{{
                          t(plan.id == 'individualSubscription'
                            ? 'subscription_teaserConvenience_title'
                            : 'subscription_teaserAlliance_title'
                          )
                        }}</h4>
                      </div>

                      <div class="bigfarm__grow" v-if="userSubscriptionByType(plan.id).id === 'individualSubscription'" data-simplebar>
                        <dl class="row no-gutters mt-2 mb-0">
                          <dt class="col-icon pl-2"><img :src="require('@/assets/images/bigfarm__bonus_harvest-all.svg')" alt="Harvest All" class="bigfarm__feature_icon" /></dt>
                          <dd class="col-description">
                            <h3>{{ t('subscription_perkHarvestAll_title') }}</h3>
                            <p>{{ t('subscription_perkHarvestAll_copy') }}</p>
                          </dd>
                          <dt class="col-icon pl-2"><img :src="require('@/assets/images/bigfarm__bonus_repeat-production.svg')" alt="Repeat Production" class="bigfarm__feature_icon" /></dt>
                          <dd class="col-description">
                            <h3>{{ t('subscription_perkProRepeat_title') }}</h3>
                            <p>{{ t('subscription_perkProRepeat_copy') }}</p>
                          </dd>
                        </dl>
                      </div>

                      <div class="bigfarm__grow allianceSubscription" v-if="userSubscriptionByType(plan.id).id === 'allianceSubscription'">
                        <div class="bigfarm__fit_height">
                          <div class="bigfarm__grow">
                            <div class="bigfarm__fit_height bigfarm__overflow_fix">

                              <div class="bigfarm__scroll_container mt-1" data-simplebar>
                                <ul class="list-unstyled">
                                  <li class="media" v-for="(perkId, index) in alliancePackPerksForHighlightedTier">
                                    <img class="mr-3" :alt="t(textKeyForItemId(perkId).title)" :src="iconNameForItemId(perkId)"/>
                                    <div class="media-body">
                                       <h3>{{ t(textKeyForItemId(perkId).title) }}</h3>{{ t(textKeyForItemId(perkId).body) }}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <hr class="fullwidth mt-2 mb-2" />

                          <div class="btn btn-secondary mb-2 ml-1 mr-1 outline-1px" @click="goToPage(3)">{{ t('subscription_AllianceBonusesButton') }}</div>
                        </div>
                      </div>

                      <hr class="fullwidth mt-0 mb-2" />

                      <div class="row bigfarm__pack_notes mb-2">
                        <div class="col-1">
                          <img :src="isUserSubscriptionActiveByType(plan.id) ? require('@/assets/images/bigfarm__status_active.svg') : require('@/assets/images/bigfarm__x.svg')" class="ml-1"/>
                        </div>
                        <div class="col-11">
                          <h3>
                            {{ t(
                                isUserSubscriptionActiveByType(plan.id)
                                  ? plan.wasCancelled
                                    ? 'subscription_payoutDate_canceled'
                                    : 'subscription_payoutDate_title'
                                  : 'subscription_currentlyNotBooked_title'
                                )
                            }}
                            <span v-if="isUserSubscriptionActiveByType(plan.id)">{{ plan.validUntil | moment("L") }}</span>
                            <div v-if="plan.id === 'allianceSubscription'">
                              <div v-if="plan.isAllianceMember">
                                {{ t_num(
                                  'subscription_allianceHasBooked_copy',
                                  'subscription_allianceHasBookedSingular_copy',
                                  'subscription_allianceHasBooked_copy',
                                  plan.allianceSubscriberCount)
                                }}
                              </div>
                              <div v-else>
                                {{ t('subscription_noAlliance_tt') }}
                              </div>
                            </div>
                          </h3>
                        </div>
                      </div>
                      <div class="bigfarm__shade_brown bigfarm__pack_subscribe fullwidth alignbottom">
                        <div class="row">
                          <div class="col-5">
                            <div class="vertical-align-center">
                              <div class="bigfarm__subscription_price">
                                <h3 class="bigfarm__price">{{ plan.price | formatPrice }} {{ plan.currency | formatCurrency }}</h3>
                                <h5 class="bigfarm__price_note">{{ t('subscription_notePerMonth') }}</h5>
                              </div>
                            </div>
                          </div>
                          <div class="col-7">
                            <a v-if="!isUserSubscriptionActiveByType(plan.id)" :href="plan.checkoutUrl" target="_blank" class="bigfarm__button align-items-center">
                                <div class="bigfarm__button_candy"><span>{{ t('subscription_buyButton_title') }}</span></div>
                                <div class="bigfarm__button_shadow"></div>
                            </a>
                            <div v-else class="bigfarm__button bigfarm__button_green align-items-center disabled">
                                <div class="bigfarm__button_candy"><span>{{ t('subscription_alreadyBooked_title') }}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </span>

            <span class="bigfarm__fit_height" :class="{ 'd-none': !(isPageActive(2) || isPageActive(3))}">
            <span :class="{ 'd-none': !(isPageActive(2) || isPageActive(3))}">
              <div class="row bigfarm__status">
                <div class="col-6 bigfarm__status_info">
                  <img :src="isUsersIndividualSubscriptionActive
                      ? require('@/assets/images/bigfarm__status_active.svg')
                      : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
                    <span class="ml-2">{{ t('subscription_packageConvenience_title') }}</span>
                </div>
                <div class="col-6 bigfarm__status_info">
                  <img :src="isUsersAllianceSubscriptionActive
                    ? require('@/assets/images/bigfarm__status_active.svg')
                    : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
                  <span class="ml-2">{{ t('subscription_packageAlliance_title') }}</span>
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
            </span>
          </div>
      </div>
    </div>
</template>

<script>
    console.clear()
    // CHECK
    import VueScrollingTable from "vue-scrolling-table"

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
        var keyValue=i.match(/([^=]*)=?(.*)/)
        if(keyValue) q[d(keyValue[1]).toLowerCase()]=d(keyValue[2]);
      }
    })(window);
    console.log(window.location.query)
    const locale = window.location.query.language || window.location.query.locale || 'en'
    if(numeral.locales[locale]) numeral.locale(locale)
    moment.locale(locale)
    export default {
        name: 'BigFarm',
        components: {
            VueScrollingTable,
            swiper,
            swiperSlide,
            simplebar
        },
        data: () => ({
          apiBaseUrl: 'https://4zleckep5b.execute-api.eu-west-1.amazonaws.com',
          deploymentStage: 'staging',
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

          subscriptions: {},
          text: {},
          currentSubscriptionTab: 'subscription_infoDialogue_general_header',
          page: 1
        }),

        computed: {
          catalogUrl() {
            return [
              this.apiBaseUrl,
              this.deploymentStage,
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
            return (type) => this.userSubscriptionByType(type).validUntil && moment().diff(this.userSubscriptionByType(type).validUntil) <= 0
          },

          isUsersIndividualSubscriptionActive() {
            return this.isUserSubscriptionActiveByType('individualSubscription')
          },

          isUsersAllianceSubscriptionActive() {
            return this.isUserSubscriptionActiveByType('allianceSubscription')
          },

          /*
          moment() {
            //moment.locale(this.locale)
            return moment
          },
          */

          tabTitleKeys() {
            return this.tabTextKeys('header')
          },
          tabCopyKeys() {
            return this.tabTextKeys('copy')
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
              ]), [])
            return Array.from(new Set(allPerks))
          },

          alliancePackPerksForHighlightedTier() {
            const highlightedAllianceTier = this.highlightedAllianceTier
            const allPerks = this
              .alliancePackBoosterData
              .filter(({from}) => from <= highlightedAllianceTier)
              .reduce((result, {items}) => ([
                ...result,
                ...(items.filter(([,amount])=>amount).map(([itemId]) => itemId))
              ]), [])
            return Array.from(new Set(allPerks))
          },

          alliancePackPerksNotInHighlightedTier() {
            return alliancePackPerks
              .filter(x => !this.alliancePackPerksForHighlightedTier.includes(x))
          },

          // an array of all the booster tiers in the alliancePack
          alliancePackBoosterTiers() {
            const allTiers = this
              .alliancePackBoosterData
              .reduce((set, {from}) => set.add(from), new Set())
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

          highlightedAllianceTier() {
            const tierMembers = Math.max(
              1,
              this.allianceSubscriberCount + (this.isUsersAllianceSubscriptionActive ? 0 : 1)
            )
            return this
              .alliancePackBoosterData
              .filter(({from}) => from && from <= tierMembers)
              .pop()
              .from
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
              elementId: window.location.query.elementid
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
            }, this.text[id] || id)
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
              : idNone
            return this.t(id, ...[value, ...args])
          },

          tabTextKeys(suffix) {
            const exceptions = {
              'subscription_infoDialogue_multiSubscriptions_header'
                : 'dialog_subscription_multiSubscriptions_header',
              'subscription_infoDialogue_monthlyPayment_copy'
                : 'dialog_subscription_monthlyPayment_copy'
            }

            const keys =
              'general monthlyPayment multiSubscriptions cancelSubscription allianceSubscription convenienceSubscription'
              .split(/\s+/)
              .map(key => `subscription_infoDialogue_${key}_${suffix}`)
              .map(key => exceptions[key] || key)

            return keys
          },

          tabCopyForTitle(title) {
            const copyIndex = this.tabTitleKeys.indexOf(title)
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
              72007: ['tempConstructionSlot', '']
            }[id]
          },

          iconNameForItemId(id) {
            return 'images/' + require('lodash.snakecase')(`${this.itemDataForId(id)[0]}_med`)+'.png'
          },

          textKeyForItemId(id) {
            const itemData = this.itemDataForId(id)

            return {
              title: `subscription_perkAlliance_${itemData[0]}_title`,
              body:  `subscription_perkAlliance_${itemData[0]}_desc`,
              prefix: itemData[1] || '',
              suffix: itemData[2] || ''
            }
          }
        },

        created() {
          fetch(this.catalogUrl)
            .then(response => response.json())
            .then(subscriptionData => {
              this.text = subscriptionData.i18n
              subscriptionData.payoutTypes = [
                subscriptionData.payoutTypes.find(({id}) => id === 'individualSubscription'),
                subscriptionData.payoutTypes.find(({id}) => id === 'allianceSubscription')
              ]
              this.subscriptions = subscriptionData
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
</style>
