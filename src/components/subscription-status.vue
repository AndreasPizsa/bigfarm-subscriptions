<template>
    <div class="row bigfarm__status">
        <div class="col-4 bigfarm__status_info">
            <img :src="isIndividualSubscriptionActive
                      ? require('@/assets/images/bigfarm__status_active.svg')
                      : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
            <span class="ml-2">{{ t('subscription_packageConvenience_title') }}</span>
        </div>
        <div class="col-4 bigfarm__status_info">
            <img :src="isAllianceSubscriptionActive
                    ? require('@/assets/images/bigfarm__status_active.svg')
                    : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
            <span class="ml-2">{{ t('subscription_packageAlliance_title') }}</span>
        </div>
        <div class="col-4 bigfarm__status_info">
            <img :src="isEnthusiastSubscriptionActive
                    ? require('@/assets/images/bigfarm__status_active.svg')
                    : require('@/assets/images/bigfarm__x.svg')" alt="Subscribed" />
            <span class="ml-2">{{ t('subscription_packageEnthusiast_title') }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {IDictionary} from "@/core/IDictionary";
    import moment from 'moment';
    import {IPlan} from "@/domain/IPlan";
    import {
        isAllianceSubscription,
        isEnthusiastSubscription,
        isIndividualSubscription
    } from "@/components/big-farm.helpers";
    import {BaseComponent} from "@/components/base-component";

    @Component({
        name: "subscription-status",
    })
    export default class SubscriptionStatus extends BaseComponent {
        @Prop({required: true}) public subscriptions!: IPlan[];
        @Prop({required: true}) public text!: IDictionary<string>;

        private isSubscriptionActive(subscription: IPlan): boolean {
            return subscription.validUntil && moment().diff(subscription.validUntil) <= 0 || !subscription.checkoutUrl;
        }

        public get isIndividualSubscriptionActive(): boolean {
            const subscription = this.subscriptions.find(isIndividualSubscription);
            return subscription ? this.isSubscriptionActive(subscription) : false;
        }

        public get isAllianceSubscriptionActive(): boolean {
            const subscription = this.subscriptions.find(isAllianceSubscription);
            return subscription ? this.isSubscriptionActive(subscription) : false;
        }

        public get isEnthusiastSubscriptionActive(): boolean {
            const subscription = this.subscriptions.find(isEnthusiastSubscription);
            return subscription ? this.isSubscriptionActive(subscription) : false;
        }
    }
</script>

<style scoped>

</style>
