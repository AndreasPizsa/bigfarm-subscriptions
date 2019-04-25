<template>
    <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__convenience_pack bigfarm__fit_height">
        <div class="bigfarm__pack_inner bigfarm__fit_height">
            <h2>{{t('subscription_packageConvenience_title')}}</h2>
            <div class="bigfarm__hero_visual bigfarm__hero-visual_package_individual" :class="plan.id"></div>
            <div class="bigfarm__shade_brown fullwidth">
                <h4>{{t('subscription_teaserConvenience_title')}}</h4>
            </div>

            <div class="bigfarm__grow">
                <div class="bigfarm__fit_height ">
                    <div class="bigfarm__scroll_container" data-simplebar>
                        <dl class="row no-gutters mt-2 mb-0">
                            <dt class="col-icon pl-2"><img
                                    :src="require('@/assets/images/bigfarm__bonus_harvest-all.svg')"
                                    :alt="t('subscription_perkHarvestAll_title')" class="bigfarm__feature_icon"/>
                            </dt>
                            <dd class="col-description">
                                <h3>{{ t('subscription_perkHarvestAll_title') }}</h3>
                                <p>{{ t('subscription_perkHarvestAll_copy') }}</p>
                            </dd>
                            <dt class="col-icon pl-2"><img
                                    :src="require('@/assets/images/bigfarm__bonus_repeat-production.svg')"
                                    :alt="t('subscription_perkProRepeat_title')" class="bigfarm__feature_icon"/>
                            </dt>
                            <dd class="col-description">
                                <h3>{{ t('subscription_perkProRepeat_title') }}</h3>
                                <p>{{ t('subscription_perkProRepeat_copy') }}</p>
                            </dd>
                            <dt class="col-icon pl-2"><img
                                    :src="require('@/assets/images/bigfarm__bonus_start-again.svg')"
                                    :alt="t('subscription_perkStartAgain_title')" class="bigfarm__feature_icon"/>
                            </dt>
                            <dd class="col-description">
                                <h3>{{ t('subscription_perkStartAll_title') }}</h3>
                                <p>{{ t('subscription_perkStartAll_copy') }}</p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <hr class="fullwidth mt-0 mb-2"/>

            <div class="row bigfarm__pack_notes mb-2">
                <div class="col-1">
                    <img :src="isUserSubscriptionActiveByType ? require('@/assets/images/bigfarm__status_active.svg') : require('@/assets/images/bigfarm__x.svg')"
                         class="ml-1"/>
                </div>
                <div class="col-11">
                    <h3>
                        {{ t(
                        isUserSubscriptionActiveByType
                        ? wasCancelled
                        ? 'subscription_payoutDate_canceled'
                        : 'subscription_payoutDate_title'
                        : 'subscription_currentlyNotBooked_title'
                        )
                        }}
                        <span v-if="isUserSubscriptionActiveByType">{{ validUntil | moment("L") }}</span>
                    </h3>
                    <p class="text-center">{{ t('subscription_cancelable_title') }}</p>
                </div>
            </div>
            <div class="bigfarm__shade_brown bigfarm__pack_subscribe fullwidth alignbottom">
                <div class="row">
                    <div class="col-5">
                        <div class="vertical-align-center">
                            <div class="bigfarm__subscription_price">
                                <h3 class="bigfarm__price">{{ price | formatPrice }} {{ currency |
                                    formatCurrency }}</h3>
                                <h5 class="bigfarm__price_note">{{ t('subscription_notePerMonth') }}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <a v-if="checkoutUrl && !isUserSubscriptionActiveByType"
                           :href="checkoutUrl"
                           target="_blank"
                           class="bigfarm__button align-items-center"
                        >
                            <div class="bigfarm__button_candy"><span>{{ t('subscription_buyButton_title') }}</span>
                            </div>
                            <div class="bigfarm__button_shadow"></div>
                        </a>
                        <div v-else class="bigfarm__button bigfarm__button_green align-items-center disabled">
                            <div class="bigfarm__button_candy">
                                <span>{{ t('subscription_alreadyBooked_title') }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import moment from "moment";
    const decodeHtml = require('he').decode;

    @Component({
        name: "individual-subscription",
        filters: {
            formatCurrency(value: 'EUR' | 'USD'): string {
                return {
                    EUR: '€',
                    USD: '$'
                }[value] || value
            },

            // todo format according to locale
            formatPrice(price: string): string {
                return window.numeral(parseInt(price) / 100).format('0,0[.]00')
            }
        },
    })
    export default class IndividualSubscription extends Vue {
        @Prop() private plan!: {
            wasCancelled: boolean;
            checkoutUrl: string;
            validUntil: string;
            id: string,
            price: string,
            currency: string,
        };

        @Prop() private text!: {
            [key: string]: string
        };

        public get id(): string {
            return this.plan.id;
        }

        public get price(): string {
            return this.plan.price;
        }

        public get currency(): string {
            return this.plan.currency;
        }

        public get validUntil(): string {
            return this.plan.validUntil;
        }

        public get checkoutUrl(): string {
            return this.plan.checkoutUrl;
        }

        public get wasCancelled(): boolean {
            return this.plan.wasCancelled;
        }

        public get isUserSubscriptionActiveByType(): boolean {
            return this.validUntil && moment().diff(this.validUntil) <= 0 || !this.checkoutUrl
        }

        public t(id: string, ...args: string[]): string {
            const text = (args || []).reduce((result, arg, index) => {
                return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
            }, this.text[id] || id);
            return decodeHtml(text)
        }
    }

</script>

<style scoped>
    .bigfarm__hero-visual_package_individual {
        background-image: url("../assets/images/hero-individualSubscription.svg");
    }
</style>
