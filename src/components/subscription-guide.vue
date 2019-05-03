<template>
  <span class="bigfarm__grow">
    <div class="row h-100">
      <div class="col-3">
        <div class="bigfarm__pack bigfarm__pack_v2 pt-3 pb-2 mt-0 mb-0 h-100">
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('general')}"
               @click="changeTab('general')">{{ t("subscription_infoDialogue_general_header") }}
          </div>
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('monthlyPayment')}"
               @click="changeTab('monthlyPayment')">{{ t("subscription_infoDialogue_monthlyPayment_header") }}
          </div>
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('multiSubscriptions')}"
               @click="changeTab('multiSubscriptions')">{{ t("dialog_subscription_multiSubscriptions_header") }}
          </div>
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('cancelSubscription')}"
               @click="changeTab('cancelSubscription')">{{ t("subscription_infoDialogue_cancelSubscription_header") }}
          </div>
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('allianceSubscription')}"
               @click="changeTab('allianceSubscription')">{{ t("subscription_infoDialogue_allianceSubscription_header") }}
          </div>
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('convenienceSubscription')}"
               @click="changeTab('convenienceSubscription')">{{ t("subscription_infoDialogue_convenienceSubscription_header") }}
          </div>
          <div class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: isActive('loyaltySubscription')}"
               @click="changeTab('loyaltySubscription')">{{ t("subscription_infoDialogue_loyaltySubscription_header") }}
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="bigfarm__pack bigfarm__description_text h-100 mt-0" ref="descriptionText">
            <div class="bigfarm__description_text_inner h-100">
              <div
                      v-if="isActive('general')"
                      v-html="t_html('subscription_infoDialogue_general_copy')"
              ></div>
              <div
                      v-if="isActive('monthlyPayment')"
                      v-html="t_html('dialog_subscription_monthlyPayment_copy')"
              ></div>
              <div
                      v-if="isActive('multiSubscriptions')"
                      v-html="t_html('subscription_infoDialogue_multiSubscriptions_copy')"
              ></div>
              <div
                      v-if="isActive('cancelSubscription')"
                      v-html="t_html('subscription_infoDialogue_cancelSubscription_copy')"
              ></div>
              <div
                      v-if="isActive('allianceSubscription')"
                      v-html="t_html('subscription_infoDialogue_allianceSubscription_copy')"
              ></div>
              <div
                      v-if="isActive('convenienceSubscription')"
                      v-html="t_html('subscription_infoDialogue_convenienceSubscription_copy')"
              ></div>
              <div
                      v-if="isActive('loyaltySubscription')"
                      v-html="t_html('subscription_infoDialogue_loyaltySubscription_copy', '20')"
              ></div>
            </div>
        </div><!-- /.bigfarm__description_text -->
      </div>
    </div>
  </span>
</template>

<script lang="ts">
  import {Component, Prop} from "vue-property-decorator";
  import {IDictionary} from "@/core/IDictionary";
  import {BaseComponent} from "@/components/base-component";

  @Component({
        name: "subscription-guide",
    })
    export default class SubscriptionGuide extends BaseComponent {
        @Prop({required: true}) public text!: IDictionary<string>;
        public currentSubscriptionTab: string = 'general';

        public changeTab(id: string): void {
            this.currentSubscriptionTab = id;
            (this.$refs.descriptionText as HTMLElement).scrollTo(0, 0);
        }

        public isActive(key: string): boolean {
            return this.currentSubscriptionTab === key;
        }
    }
</script>

<style scoped>

</style>
