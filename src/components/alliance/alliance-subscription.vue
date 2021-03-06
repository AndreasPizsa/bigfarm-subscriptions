<template>
    <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__convenience_pack bigfarm__fit_height">
        <div class="bigfarm__pack_inner bigfarm__fit_height">
            <h2>{{t('subscription_packageAlliance_title')}}</h2>
            <div class="bigfarm__hero_visual bigfarm__hero-visual_package_alliance" :class="plan.id"></div>
            <div class="bigfarm__shade_brown fullwidth">
                <h4>{{t('subscription_teaserAlliance_title')}}</h4>
            </div>

            <div class="bigfarm__grow allianceSubscription">
                <div class="bigfarm__fit_height">
                    <div class="bigfarm__grow">
                        <div class="bigfarm__fit_height">
                            <div class="bigfarm__scroll_container mt-1" data-simplebar>
                                <ul class="list-unstyled">
                                    <li class="media" v-for="(perkId, index) in alliancePackPerksForHighlightedTier">
                                        <img class="mr-3" :alt="t(textKeyForItemId(perkId).title)"
                                             :src="iconNameForItemId(perkId)"/>
                                        <div class="media-body">
                                            <h3>{{ t(textKeyForItemId(perkId).title) }}</h3>{{
                                            t(textKeyForItemId(perkId).body) }}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <hr class="fullwidth mt-0 mb-2"/>

                    <div class="btn btn-secondary mb-2 ml-1 mr-1 outline-1px" @click="goToBonusList">{{
                        t('subscription_AllianceBonusesButton') }}
                    </div>
                </div>
            </div>

            <hr class="fullwidth mt-0 mb-2"/>

            <div class="row bigfarm__pack_notes mb-2">
                <div class="col-1">
                    <img :src="isUserSubscriptionActiveByType(plan.id) ? require('@/assets/images/bigfarm__status_active.svg') : require('@/assets/images/bigfarm__x.svg')"
                         class="ml-1"/>
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
                        <div>
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
                        <a v-if="plan.checkoutUrl && !isUserSubscriptionActiveByType(plan.id)"
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
    </div>
</template>

<script>
    import {allianceItemData} from "./allianceItemData";

    const decodeHtml = require('he').decode;

    function last(arr) {
        return arr[arr.length - 1];
    }


    export default {
        name: "alliance-subscription",
        props: {
            plan: {
                type: Object,
                required: true,
            },
            text: {
                type: Object,
                required: true,
            },
        },
        computed: {
            id() {
                return this.plan.id;
            },
            price() {
                return this.plan.price;
            },
            currency() {
                return this.plan.currency;
            },
            validUntil() {
                return this.plan.validUntil;
            },
            checkoutUrl() {
                return this.plan.checkoutUrl;
            },
            wasCancelled() {
                return this.plan.wasCancelled;
            },
            isAllianceMember() {
                return Boolean(this.alliancePack.isAllianceMember)
            },
            alliancePackPerksForHighlightedTier() {
                const highlightedAllianceTier = this.highlightedAllianceTier;
                const allPerks = this.plan.boosterTiers
                    .filter(({from}) => from <= highlightedAllianceTier)
                    .reduce((result, {items}) => ([
                        ...result,
                        ...(items.filter(([, amount]) => amount).map(([itemId]) => itemId))
                    ]), []);
                return Array.from(new Set(allPerks))
            },
            highlightedAllianceTier() {
                const highlightedAllianceMemberCount = Math.max(
                    1,
                    (this.plan.isAllianceMember ? 1 : 0) *
                    (
                        (this.isUsersAllianceSubscriptionActive ? 0 : 1)
                        + (this.plan.allianceSubscriberCount || 0)
                    )
                );
                const items = this.plan.boosterTiers
                    .filter(({from}) => from && from <= highlightedAllianceMemberCount);
                return items.length ? last(items).from : {};
            },
            alliancePackBoosterData() {
                return this.alliancePack.boosterTiers || []
            },
            alliancePack() {
                return this.plan || {};
            },
            allianceSubscriberCount() {
                return this.plan.allianceSubscriberCount || 0
            },
            isUsersAllianceSubscriptionActive() {
                return this.isUserSubscriptionActiveByType('allianceSubscription')
            },
            userSubscriptionByType() {
                return (type) => this.plan || {};
            },
            isUserSubscriptionActiveByType() {
                return (type) => this.userSubscriptionByType(type).validUntil && moment().diff(this.userSubscriptionByType(type).validUntil) <= 0 || !this.userSubscriptionByType(type).checkoutUrl
            },
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
                return numeral(parseInt(price) / 100).format('0,0[.]00')
            }
        },
        methods: {
            t_num(idNone, idSingular, idPlural, value, ...args) {
                const id = value
                    ? value == 1
                        ? idSingular
                        : idPlural
                    : idNone;
                return this.t(id, ...[value, ...args])
            },
            t(id, ...args) {
                const text = (args || []).reduce((result, arg, index) => {
                    return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
                }, this.text[id] || id);
                return decodeHtml(text)
            },
            itemDataForId(id) {
                return allianceItemData[id];
            },
            textKeyForItemId(id) {
                const itemData = this.itemDataForId(id)

                return {
                    title: `subscription_perkAlliance_${itemData[0]}_title`,
                    body: `subscription_perkAlliance_${itemData[0]}_desc`,
                    prefix: itemData[1] || '',
                    suffix: itemData[2] || ''
                }
            },
            iconNameForItemId(id) {
                return 'images/' + require('lodash.snakecase')(`${this.itemDataForId(id)[0]}_med`) + '.png'
            },
            goToBonusList() {
                this.$emit('go-to-bonus-list')
            }
        },
    }
</script>

<style scoped lang="scss">
    .bigfarm__hero-visual_package_alliance {
        background-image: url("../../assets/images/hero-allianceSubscription.jpg");
    }
</style>
