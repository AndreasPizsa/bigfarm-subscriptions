<template>
    <div class="wrap container" role="document">
        <div class="content">
            <div class="bigfarm__test">X</div>

            <div class="bigfarm__overlay"></div>

            <div class="bigfarm__window">
                <div class="bigfarm__window_header">
                    <div class="row">
                        <div class="col-8 bigfarm__window_header_padding">
                            <div class="bigfarm__header_holder">
                                <h1 class="outline-05px">{{ title }}</h1>

                            </div>
                        </div>
                        <div class="col-4">
                          <div class="bigfarm__window_buttons">
                            <div class="btn btn-secondary outline-1px" @click="goToStep(step === 1 ? 2 : 1)">Subscription Guide</div>
                            <img :src="require('@/assets/images/bigfarm__close_button.svg')" alt="X" />
                          </div>
                        </div>
                    </div>
                </div>

                <div class="bigfarm__window_inner">
                    <div class="row bigfarm__intro_text" v-if="step === 1">
                      <div class="col">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure</p>
                      </div>
                    </div>

                    <div class="row" v-if="step === 1">
                      <div class="col" v-for="plan in subscriptions.payoutTypes">
                        <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__convenience_pack">
                          <div class="bigfarm__pack_inner">
                            <h2>{{ getPlanById(plan.id).title }}</h2>
                            <div class="bigfarm__hero_visual" :style="{
                                      'background-image': `url(${subscriptions.base.assetsBaseUrl}${plan.id})`
                                  }"
                              ></div>
                            <div class="bigfarm__shade_brown fullwidth">
                              <h4>{{ getPlanById(plan.id).subtitle }}</h4>
                            </div>
                            
                            <div v-if="getPlanById(plan.id).id === 'individualSubscription'">
                              <dl class="row no-gutters mt-2 mb-0">
                                <dt class="col-icon pl-2"><img :src="require('@/assets/images/bigfarm__bonus_harvest-all.svg')" alt="Harvest All" class="bigfarm__feature_icon" /></dt>
                                <dd class="col-description">
                                  <h3>Harvest All Button</h3>
                                  <p>The island is good for nothing but if you have one, you’ll get a hug. Every day one hug, so that you don’t feel lonely anymore ...</p>
                                </dd>
                                <dt class="col-icon pl-2"><img :src="require('@/assets/images/bigfarm__bonus_repeat-production.svg')" alt="Repeat Production" class="bigfarm__feature_icon" /></dt>
                                <dd class="col-description">
                                  <h3>Repeat Production Button</h3>
                                  <p>The island is good for nothing but if you have one, you’ll get a hug. Every day one hug, so that you don’t feel lonely anymore ...</p>
                                </dd>
                              </dl>
                            </div>

                            <div v-if="getPlanById(plan.id).id === 'allianceSubscription'">
                                <div class="bigfarm__scroll_container mt-1" >
                                  <swiper
                                      :options="sliderPacksOptions"
                                      ref="sliderPacks"
                                      class="bigfarm__pack_contents"
                                  >
                                      <swiper-slide
                                          v-for="(pack, index) in normalPacks"
                                          :key="`${pack.text}-${index}`"
                                      >
                                          <div class="bigfarm__pack_single">
                                              <div class="dummy-img">
                                                  <img
                                                      alt=""
                                                      :src="require(`@/assets/images/${pack.image}`)"
                                                      v-if="pack.image"
                                                  />
                                              </div>

                                              <div class="description">{{ pack.text }}</div>
                                          </div><!-- /.bigfarm__pack -->
                                      </swiper-slide>

                                      <div class="bigfarm__slider_controls" slot="pagination">
                                          <a href="#"
                                              class="bigfarm__slider_first"
                                              @click.prevent="slideToFirst"
                                          >First</a>

                                          <a href="#"
                                              class="bigfarm__slider_prev"
                                              @click.prevent="slidePrev"
                                          >Prev</a>

                                          <a href="#"
                                              class="bigfarm__slider_next"
                                              @click.prevent="slideNext"
                                          >Next</a>

                                          <a href="#"
                                              class="bigfarm__slider_last"
                                              @click.prevent="slideToLast"
                                          >Last</a>
                                      </div><!-- /.bigfarm__slider_controls -->

                                  </swiper>
                                </div>

                                <hr class="fullwidth mt-2 mb-2" />

                                <div class="btn btn-secondary mb-2 ml-1 mr-1 outline-1px" @click="goToStep(3)">Cooperative Bonus List</div>
                            </div>

                            <hr class="fullwidth mt-2 mb-2" />

                            <div class="row bigfarm__pack_notes mb-2">
                              <div class="col-1">
                                <img :src="require('@/assets/images/bigfarm__status_active.svg')" alt="Active" class="ml-1" />
                              </div>
                              <div class="col-11">
                                <h3>Next Payday: {{ plan.validUntil | moment("L") }}</h3>
                              </div>
                            </div>
                            <div class="bigfarm__shade_brown bigfarm__pack_subscribe fullwidth alignbottom">
                              <div class="row">
                                <div class="col-5">
                                  <div class="vertical-align-center">
                                    <div class="bigfarm__subscription_price">
                                      <h3 class="bigfarm__price">{{ plan.price.amount | formatPrice }} {{ plan.price.currency | formatCurrency }}</h3>
                                      <h5 class="bigfarm__price_note">per month</h5>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-7">
                                  <div v-if="moment().diff(plan.validUntil) <= 0" class="bigfarm__button align-items-center">
                                      <div class="bigfarm__button_candy"><span>Active</span></div>

                                      <div class="bigfarm__button_shadow"></div>
                                  </div>

                                  <a v-if="moment().diff(plan.validUntil) > 0" :href="plan.checkoutUrl" class="bigfarm__button align-items-center">
                                      <div class="bigfarm__button_candy"><span>Buy</span></div>
                                      <div class="bigfarm__button_shadow"></div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row bigfarm__status" v-if="step === 2">
                      <div class="col-6 bigfarm__status_info">
                        <img :src="require('@/assets/images/bigfarm__status_active.svg')" alt="Subscribed" /> <span>Convenience Package</span>
                      </div>
                      <div class="col-6 bigfarm__status_info">
                        <img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /> <span>Alliance Package</span>
                      </div>
                    </div>

                    <div class="row" v-if="step === 2">
                      <div class="col-3">
                        <div class="bigfarm__pack bigfarm__pack_v2 h100 mt-0">
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-1'}" @click="changeTab('tab-1')">General subscription information</div>
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-2'}" @click="changeTab('tab-2')">Monthly Payment</div>
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-3'}" @click="changeTab('tab-3')">Owning multiple subscriptions</div>
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-4'}" @click="changeTab('tab-4')">Not logged in for a certain amount of time</div>
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-5'}" @click="changeTab('tab-5')">Canceling a subscription</div>
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-6'}" @click="changeTab('tab-6')">Cooperative Subscription<br />(non-cooperative players, too)</div>
                          <div class="btn btn-secondary w100 mb-2 outline-1px" :class="{ current: currentSubscriptionTab === 'tab-7'}" @click="changeTab('tab-7')">Alliance Bonuses<br />(multiple members)</div>
                        </div>
                      </div>
                      <div class="col-9">
                        <div class="bigfarm__pack bigfarm__description_text h100 mt-0" ref="descriptionText">
                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-1' ">
                              <h4>Harvest All zur freien Verfügung - Automatisch Aktiv</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            
                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-2' ">
                              <h4>Tab 2</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>

                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-3' ">
                              <h4>Tab 3</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>

                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-4' ">
                              <h4>Tab 4</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>

                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-5' ">
                              <h4>Tab 5</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>

                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-6' ">
                              <h4>Tab 6</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>

                            <div class="bigfarm__description_text_inner" v-if="currentSubscriptionTab === 'tab-7' ">
                              <h4>Tab 7</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div><!-- /.bigfarm__description_text -->
                      </div>
                    </div>

                    <div class="row bigfarm__status" v-if="step === 3">
                      <div class="col-6 bigfarm__status_info">
                        <img :src="require('@/assets/images/bigfarm__status_active.svg')" alt="Active" /> <span>Convenience Package</span>
                      </div>
                      <div class="col-6 bigfarm__status_info">
                        <img :src="require('@/assets/images/bigfarm__x.svg')" alt="X" /> <span>Alliance Package</span>
                      </div>
                    </div>

                    <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list mt-0" v-if="step === 3">
                      <div class="bigfarm__infoheader">
                        <div class="bigfarm__icon_back" @click="goToStep(1)"><img :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" /></div>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import moment from 'moment';

    const PLANS = [
        {
            id: 'individualSubscription',
            title: 'Convenience Package',
            subtitle: 'Convenience features for successful farmers'
        },
        {
            id: 'allianceSubscription',
            title: 'Alliance Package',
            subtitle: 'Bonuses for all alliance members'
        }
    ]

    export default {
        name: 'BigFarm',
        components: {
            swiper,
            swiperSlide
        },
        data: () => ({
            currentSubscriptionTab: 'tab-1',
            step: 1,
            title: 'Subscription Shop',
            subscriptions: {},
            packs: [
                {
                    text: '10 experience points for harvesting a wonderful stable.',
                    image: 'dummy-featured-image.png',
                    featured: true,
                },
                {
                    text: '5 experience points for harvesting stables.',
                    image: 'dummy-featured-image.png',
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                },
                {
                    text: '10 experience points for harvesting stables.',
                    image: null,
                    featured: false,
                }
            ],
            sliderPacksOptions: {
                direction: 'vertical',
                slidesPerView: 'auto',
                simulateTouch: false
            },
            selectedPlan: null
        }),
        computed: {
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
              return moment;
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

            selectPlan(id) {
                this.selectedPlan = id;
            },

            goToStep(step) {
                this.step = step;
            },

            changeTab(id){
                this.currentSubscriptionTab = id;

                this.$refs.descriptionText.scrollTo(0, 0);
            },

            getPlanById(planId) {
                return PLANS.find(plan => plan.id === planId);
            }
        },

        created() {
            fetch('./data/subscriptions.json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.subscriptions = data;
                });
        }
    }
</script>
