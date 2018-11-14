<template>
    <div class="wrap container" role="document">
        <div class="content">
            <div class="bigfarm__test">X</div>

            <div class="bigfarm__overlay"></div>

            <div class="bigfarm__window" :class="{ 'd-none': !canShow }">
                <div class="bigfarm__window_header">
                    <div class="row">
                        <div class="col-8 bigfarm__window_header_padding">
                            <div class="bigfarm__header_holder">
                                <h1 class="outline-05px">{{ t('subscription_general_head') }}</h1>
                            </div>
                        </div>
                        <div class="col-4">
                          <div class="bigfarm__window_buttons">
                            <div class="btn btn-secondary outline-1px" @click="goToPage(page === 1 ? 2 : 1)">{{ t('subscription_general_GuideButton') }}</div>
                            <img :src="require('@/assets/images/bigfarm__close_button.svg')" alt="X" />
                          </div>
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
                      <div class="col" v-for="plan in subscriptions.payoutTypes">
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

                            <div class="bigfarm__grow" v-if="userSubscriptionByType(plan.id).id === 'individualSubscription'">
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

                            <div class="bigfarm__grow" v-if="userSubscriptionByType(plan.id).id === 'allianceSubscription'">
                              <div class="bigfarm__fit_height">
                                <div class="bigfarm__grow">
                                  <div class="bigfarm__fit_height bigfarm__overflow_fix">
                                <div class="bigfarm__scroll_container mt-1" >
                                  <div class="bigfarm__pack_single" v-for="(perkId, index) in alliancePackPerks">
                                      <div class="dummy-img">
                                          <img alt="" :src="iconNameForItemId(perkId)"/>
                                      </div>

                                      <div class="description">{{ t(textKeyForItemId(perkId).title) }}</div>
                                  </div><!-- /.bigfarm__pack -->
                                    </div>
                                  </div>
                                </div>

                                <hr class="fullwidth mt-2 mb-2" />

                                <div class="btn btn-secondary mb-2 ml-1 mr-1 outline-1px" @click="goToPage(3)">{{ t('subscription_AllianceBonusesButton') }}</div>
                              </div>
                            </div>

                            <hr class="fullwidth mt-2 mb-2" />

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
                                        plan.otherAllianceSubscribers)
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
                                      <h3 class="bigfarm__price">{{ plan.price.amount | formatPrice }} {{ plan.price.currency | formatCurrency }}</h3>
                                      <h5 class="bigfarm__price_note">{{ t('subscription_notePerMonth') }}</h5>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-7">
                                  <div v-if="moment().diff(plan.validUntil) <= 0" class="bigfarm__button align-items-center">
                                      <div class="bigfarm__button_candy"><span>{{ t('subscription_alreadyBooked_title') }}</span></div>
                                      <div class="bigfarm__button_shadow"></div>
                                  </div>

                                  <a v-if="moment().diff(plan.validUntil) > 0" :href="plan.checkoutUrl" class="bigfarm__button align-items-center">
                                      <div class="bigfarm__button_candy"><span>{{ t('subscription_buyButton_title') }}</span></div>
                                      <div class="bigfarm__button_shadow"></div>
                                  </a>
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
                        <img :src="isUsersIndividualSubscriptionActive ? require('@/assets/images/bigfarm__status_active.svg') : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" /> <span>{{ t('subscription_packageConvenience_title') }}</span>
                      </div>
                      <div class="col-6 bigfarm__status_info">
                        <img :src="isUsersAllianceSubscriptionActive ? require('@/assets/images/bigfarm__status_active.svg') : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" /> <span>{{ t('subscription_packageAlliance_title') }}</span>
                      </div>
                    </div>
                  </span>

                    <span class="bigfarm__grow" :class="{ 'd-none': !isPageActive(2)}">
                      <div class="row h100">
                        <div class="col-3">
                            <div class="bigfarm__pack bigfarm__pack_v2 pt-3 pb-2 mt-0 mb-0">
                            <div v-for="key in tabTitleKeys"
                                  class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === key}"
                                  @click="changeTab(key)">{{ t(key) }}
                            </div>
                          </div>
                        </div>
                        <div class="col-9">
                          <div class="bigfarm__pack bigfarm__description_text h100 mt-0" ref="descriptionText">
                              <div
                                class="bigfarm__description_text_inner"
                                v-html="t(tabCopyForTitle(currentSubscriptionTab))">
                              </div>
                          </div><!-- /.bigfarm__description_text -->
                        </div>
                      </div>
                    </span>

                    <span class="bigfarm__grow" :class="{ 'd-none': !isPageActive(3)}">
                      <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list bigfarm__fit_height mt-0">
                      <div class="bigfarm__infoheader">
                        <div class="bigfarm__icon_back" @click="goToPage(1)"><img :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" /></div>
                        <h5>{{ t('subscription_allianceProgress') }}</h5>
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
                              <td>
                                <div class="fill">
                                  <dl>
                                    <dt><div class="thumbnail"><img alt="" :src="iconNameForItemId(perkId)" width="100%" height="100%"/></div></dt>
                                    <dd>
                                      <h3>{{ t(textKeyForItemId(perkId).title) }}</h3>
                                      <p>{{ t(textKeyForItemId(perkId).body) }}</p>
                                    </dd>
                                  </dl>
                                </div>
                              </td>
                              <td v-for="tier in alliancePackBoosterTiers">{{ alliancePackBoosterPerkBoostForTier(perkId, tier) | xIfEmptyOrZero }}</td>
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
    </div>
</template>

<script>
    // CHECK
    import VueScrollingTable from "vue-scrolling-table"

    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import moment from 'moment';

    /**
    * sets window.location.query, which is a hash with all parameters
    * param names are all lowercase
    * reference as window.location.query.myparameter
    */
    (function parseWindowLocationQuery(w){
      var d=decodeURIComponent,
          q=w.location.query=w.location.query||{},
          pairs=w.location.search.substr(1).split('&'),
          i;
      while(i=pairs.pop()) {
        var keyValue=i.match(/([^=]*)=?(.*)/)
        if(keyValue) q[d(keyValue[1]).toLowerCase()]=d(keyValue[2]);
      }
    })(window);

    export default {
        name: 'BigFarm',
        components: {
            VueScrollingTable,
            swiper,
            swiperSlide
        },
        props: {
          title: {
            tyoe: String,
            default: 'Subscription Shop'
          }
        },
        data: () => ({
          scrollVertical: true,
          scrollHorizontal: true,
          syncHeaderScroll: true,
          syncFooterScroll: true,
          includeFooter: false,
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
            return (type) => moment().diff(this.userSubscriptionByType(type).validUntil) <= 0
          },

          isUsersIndividualSubscriptionActive() {
            return this.isUserSubscriptionActiveByType('individualSubscription')
          },

          isUsersAllianceSubscriptionActive() {
            return this.isUserSubscriptionActiveByType('allianceSubscription')
          },

          moment() {
            moment.locale(this.locale)
            return moment
          },

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
              return parseFloat(price) / 100;
            },

            xIfEmptyOrZero(value) {
              return value || '–'
            }
        },

        methods: {
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
            return (args || []).reduce((result, arg, index) => {
              return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
            }, this.text[id] || id)
          },

          t_num(idNone, idSingular, idPlural, value, ...args) {
            const id = value
              ? value == 1
                ? idSingular
                : idPlural
              : idNone
            return this.t(id, ...[value, ...args])
          },

          loadLanguagesFromUrl(url) {
            fetch(url).then(async (response) => {
              return this.text = await response.json()
            })
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

          iconForItemId(id) {
            //return require(name)
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
          fetch('./data/subscriptions.json')
            .then(response => response.json())
            .then(data => {
                this.loadLanguagesFromUrl(`data/${this.locale}.json`)
                this.subscriptions = data;
            });
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
