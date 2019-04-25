<template>
    <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__convenience_pack bigfarm__pack_type_enthusiast bigfarm__fit_height">
        <div class="bigfarm__pack_inner bigfarm__fit_height">
            <h2>{{t('subscription_packageEnthusiast_title')}}</h2>
            <div class="bigfarm__hero_visual bigfarm__hero-visual_package_enthusiast" :class="plan.id"></div>
            <div class="bigfarm__shade_brown fullwidth">
                <h4>{{t('subscription_teaserEnthusiast_title')}}</h4>
            </div>

            <div class="bigfarm__grow allianceSubscription">
                <div class="bigfarm__fit_height">
                    <div class="bigfarm__grow">
                        <div class="bigfarm__fit_height">
                            <div class="bigfarm__scroll_container mt-1" data-simplebar>
                                <ul class="list-unstyled">
                                    <li class="media" v-for="(perkId, index) in perksForHighlightedTier">
                                        <img class="mr-3 media-image_package_enthusiast"
                                             :alt="t(perkTitle(perkId))" :src="iconNameForItemId(perkId)"/>
                                        <div class="media-body">
                                            <h3>{{ t(perkTitle(perkId)) }}</h3>{{
                                            t(perkDesc(perkId)) }}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <hr class="fullwidth mt-0 mb-2"/>

                    <div class="btn btn-secondary mb-2 ml-1 mr-1 outline-1px" @click="goToBonusList">{{
                        t('subscription_EnthusiastBonusesButton') }}
                    </div>
                </div>
            </div>

            <hr class="fullwidth mt-0 mb-2"/>

            <div class="row bigfarm__pack_notes mb-2">
                <div class="col-1">
                    <img :src="isSubscriptionActive ? require('@/assets/images/bigfarm__status_active.svg') : require('@/assets/images/bigfarm__x.svg')"
                         class="ml-1"/>
                </div>
                <div class="col-11">
                    <h3>
                        {{ t(
                        isSubscriptionActive
                        ? plan.wasCancelled
                        ? 'subscription_payoutDate_canceled'
                        : 'subscription_payoutDate_title'
                        : 'subscription_currentlyNotBooked_title'
                        )
                        }}
                        <span v-if="isSubscriptionActive">{{ plan.validUntil | moment("L") }}</span>
                    </h3>
                    <p class="text-center">{{ t('subscription_cancelable_title') }}</p>
                </div>
            </div>
            <div class="bigfarm__shade_brown bigfarm__pack_subscribe fullwidth alignbottom">
                <div class="row">
                    <div class="col-5">
                        <div class="vertical-align-center">
                            <div class="bigfarm__subscription_price">
                                <h3 class="bigfarm__price">{{ plan.price | formatPrice }} {{ plan.currency |
                                    formatCurrency }}</h3>
                                <h5 class="bigfarm__price_note">{{ t('subscription_notePerMonth') }}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <a v-if="plan.checkoutUrl && !isSubscriptionActive"
                           :href="plan.checkoutUrl"
                           target="_blank"
                           class="bigfarm__button align-items-center"
                        >
                            <div class="bigfarm__button_candy"><span>{{ t('subscription_buyButton_title') }}</span>
                            </div>
                            <div class="bigfarm__button_shadow"></div>
                        </a>
                        <div v-else class="bigfarm__button bigfarm__button_green align-items-center disabled">
                            <div class="bigfarm__button_candy"><span>{{ t('subscription_alreadyBooked_title') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img src="../../assets/images/loyalty_badge_med.svg" class="bigfarm-pack__badge pack-badge"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {enthusiastItemData, IEnthusiastItemData} from "./enthusiastItemData";
    import {unique} from "@/core/helpers";
    import VueScrollingTable from "vue-scrolling-table";
    import {IPlan} from "@/domain/IPlan";
    import {IDictionary} from "@/core/IDictionary";
    import moment from "moment";

    const decodeHtml = require('he').decode;

    @Component({
        name: "enthusiast-subscription",
        components: {
            VueScrollingTable,
        },
        filters: {
            formatCurrency(value: 'EUR' | 'USD'): string {
                return {
                    EUR: '€',
                    USD: '$'
                }[value] || value
            },

            // todo format according to locale
            formatPrice(price: string): string {
                return window.numeral(parseInt(price) / 100).format('0,0[.]00');
            }
        },
    })
    export default class EnthusiastSubscription extends Vue {
        @Prop({required: true}) public plan!: IPlan;
        @Prop({required: true}) public text!: IDictionary<string>;

        public get perksForHighlightedTier(): number[] {
            return this.plan.boosterTiers
                .reduce<number[]>((result, {items}) => ([
                    ...result,
                    ...(items.filter(([, amount]) => amount).map(([itemId]) => itemId))
                ]), [])
                .filter(unique);
        }

        public get isSubscriptionActive(): boolean {
            return this.plan.validUntil && moment().diff(this.plan.validUntil) <= 0 || !this.plan.checkoutUrl
        }

        public t(id: string, ...args: string[]): string {
            const text = (args || []).reduce((result, arg, index) => {
                return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
            }, this.text[id] || id);
            return decodeHtml(text)
        }

        private itemDataForId(id: number): IEnthusiastItemData {
            return enthusiastItemData[id];
        }

        public perkTitle(perkId: number): string {
            const [key, ...rest] = this.itemDataForId(perkId);
            return `subscription_perkEnthusiast_${key}_title`;
        }

        public perkDesc(perkId: number): string {
            const [key, ...rest] = this.itemDataForId(perkId);
            return `subscription_perkEnthusiast_${key}_desc`;
        }

        public iconNameForItemId(id: number): string {
            return require(`@/assets/images/${this.itemDataForId(id)[0]}.svg`);
        }

        public goToBonusList(): void {
            this.$emit('go-to-bonus-list')
        }
    }
</script>

<style scoped>
    .bigfarm__hero-visual_package_enthusiast {
        background-image: url("../../assets/images/hero-enthusiastSubscription.svg");
    }

    .bigfarm__pack_type_enthusiast {
        position: relative;
    }

    .bigfarm-pack__badge {
        position: absolute;
        top: 0.5rem;
        left: 0;
    }

    .pack-badge {
        height: 4rem;
    }

    .media-image_package_enthusiast {
        height: 2rem;
    }
</style>
