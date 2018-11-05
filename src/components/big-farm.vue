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
                            <!-- todo: toggle -->
                            <div class="btn btn-secondary outline-1px" @click="goToPage(page === 1 ? 2 : 1)">{{ t('subscription_general_GuideButton') }}</div>
                            <img :src="require('@/assets/images/bigfarm__close_button.svg')" alt="X" />
                          </div>
                        </div>
                    </div>
                </div>

                <!--============================================================

                =============================================================-->
                <div class="bigfarm__window_inner">
                  <span :class="{ 'd-none': !isPageActive(1)}">
                    <div class="row bigfarm__intro_text">
                      <div class="col">
                        <p>{{ t('subscription_general_copy') }}</p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col" v-for="plan in subscriptions.payoutTypes">
                        <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__convenience_pack">
                          <div class="bigfarm__pack_inner">
                            <h2>{{
                                t(plan.id == 'individualSubscription'
                                  ? 'subscription_packageConvenience_title'
                                  : 'subscription_packageAlliance_title'
                                )
                            }}</h2>
                            <div class="bigfarm__hero_visual" :style="{
                                      'background-image': `url(${subscriptions.base.assetsBaseUrl}${plan.id})`
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

                            <div v-if="userSubscriptionByType(plan.id).id === 'individualSubscription'">
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

                            <div v-if="userSubscriptionByType(plan.id).id === 'allianceSubscription'">
                                <div class="bigfarm__scroll_container mt-1" >
                                  <swiper :options="sliderPacksOptions" ref="sliderPacks" class="bigfarm__pack_contents">
                                      <swiper-slide
                                          v-for="(pack, index) in normalPacks"
                                          :key="`${pack.text}-${index}`"
                                      >
                                          <div class="bigfarm__pack_single">
                                              <div class="dummy-img">
                                                  <img alt="" :src="require(`@/assets/images/${pack.image}`)" v-if="pack.image"/>
                                              </div>

                                              <div class="description">{{ pack.text }}</div>
                                          </div><!-- /.bigfarm__pack -->
                                      </swiper-slide>

                                      <div class="bigfarm__slider_controls" slot="pagination">
                                          <a href="#" class="bigfarm__slider_first" @click.prevent="slideToFirst">First</a>
                                          <a href="#" class="bigfarm__slider_prev"  @click.prevent="slidePrev">Prev</a>
                                          <a href="#" class="bigfarm__slider_next"  @click.prevent="slideNext">Next</a>
                                          <a href="#" class="bigfarm__slider_last"  @click.prevent="slideToLast">Last</a>
                                      </div><!-- /.bigfarm__slider_controls -->

                                  </swiper>
                                </div>

                                <hr class="fullwidth mt-2 mb-2" />

                                <div class="btn btn-secondary mb-2 ml-1 mr-1 outline-1px" @click="goToPage(3)">{{ t('subscription_AllianceBonusesButton') }}</div>
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
                                          ? 'subscription_payoutDate_cancelled'
                                          : 'subscription_payoutDate_title'
                                        : 'subscription_currentlyNotBooked_title'
                                      )
                                  }}
                                  <span>{{ plan.validUntil | moment("L") }}</span>
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

                  <span :class="{ 'd-none': !isPageActive(2)}">
                    <div class="row">
                      <div class="col-3">
                        <div class="bigfarm__pack bigfarm__pack_v2 h100 mt-0">
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

                  <span :class="{ 'd-none': !isPageActive(3)}">
                    <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list mt-0">
                      <div class="bigfarm__infoheader">
                        <div class="bigfarm__icon_back" @click="goToPage(1)"><img :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" /></div>
                        <h5>Progress of values if multiple members have booked the alliance subscription</h5>
                      </div>

                    <table class="bigfarm__table">
                      <thead>
                        <tr>
                          <th colspan="2">Bonuses</th>
                          <th>1</th>
                          <th>2</th>
                          <th>3</th>
                          <th>5</th>
                          <th>10</th>
                          <th>15</th>
                          <th>20</th>
                          <th>30</th>
                          <th>40</th>
                          <th>50</th>
                          <th>60</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><div class="thumbnail"></div></td>
                          <td><h3>Edge Plant Production</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                        </tr>
                        <tr>
                          <td><div class="thumbnail"></div></td>
                          <td><h3>Edge Plant Production</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                        </tr>
                        <tr>
                          <td><div class="thumbnail"></div></td>
                          <td><h3>Edge Plant Production</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                        </tr>
                        <tr>
                          <td><div class="thumbnail"></div></td>
                          <td><h3>Edge Plant Production</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p></td>
                          <td><img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /></td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                          <td>+xxx%</td>
                        </tr>
                      </tbody>
                    </table>

                    </div>
                  </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
          locale: window.location.query.locale || 'en',
          subscriptions: {},
          text: {},
          currentSubscriptionTab: 'subscription_infoDialogue_general_header',
          page: 1,
          packs: [],
          sliderPacksOptions: {
            direction: 'vertical',
            slidesPerView: 'auto',
            simulateTouch: false
          }
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

            t() {
              return (id, ...args) => this.text[id] || id
            },

            normalPacks() {
                return this.packs.filter(pack => !pack.featured);
            },

            featuredPacks() {
                return this.packs.filter(pack => pack.featured);
            },
            slider() {
                return this.$refs.sliderPacks[0].swiper;
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
            }
        },

        filters: {
            formatCurrency(value) {
                switch(value) {
                    case 'EUR':
                        return '€';
                        break;
                    case 'USD':
                        return '$';
                        break;
                    default:
                        return value;
                }
            },

            formatPrice(price) {
              return parseFloat(price) / 100;
            }
        },

        methods: {
            slidePrev() {
                this.slider.slidePrev();
            },

            slideNext() {
                this.slider.slideNext();
            },

            slideToFirst() {
                this.slider.slideTo(0);
            },

            slideToLast() {
                this.slider.slideTo(this.normalPacks.length);
            },

            goToPage(page) {
                this.page = page;
            },

            changeTab(id){
              this.currentSubscriptionTab = id;
              this.$refs.descriptionText.scrollTo(0, 0);
            },

            getPlanById(planId) {
                return this.subscriptions.payoutTypes.find(plan => plan.id === planId);
            },

            loadLanguagesFromUrl(url) {
              fetch(url).then(async (response) => this.text = await response.json())
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
