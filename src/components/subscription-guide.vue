<template>
  <span class="bigfarm__grow">
    <div class="row h-100">
      <div class="col-3">
          <div class="bigfarm__pack bigfarm__pack_v2 pt-3 pb-2 mt-0 mb-0 h-100">
          <div v-for="key in tabTitleKeys"
               class="btn btn-secondary w-100 mb-2 outline-1px"
               :class="{ current: currentSubscriptionTab === key}"
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
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {IDictionary} from "@/core/IDictionary";

    const decodeHtml = require('he').decode;

    @Component({
        name: "subscription-guide",
    })
    export default class SubscriptionGuide extends Vue {
        public currentSubscriptionTab: string = 'subscription_infoDialogue_general_header';
        @Prop({required: true}) public text!: IDictionary<string>;

        public changeTab(id: string): void {
            this.currentSubscriptionTab = id;
            (this.$refs.descriptionText as HTMLElement).scrollTo(0, 0);
        }

        public get tabTitleKeys(): string[] {
            return this.tabTextKeys('header');
        }

        private tabTextKeys(suffix: string): string[] {
            const exceptions: IDictionary<string> = {
                'subscription_infoDialogue_multiSubscriptions_header'
                    : 'dialog_subscription_multiSubscriptions_header',
                'subscription_infoDialogue_monthlyPayment_copy'
                    : 'dialog_subscription_monthlyPayment_copy'
            };

            return 'general monthlyPayment multiSubscriptions cancelSubscription allianceSubscription convenienceSubscription'
                .split(/\s+/)
                .map(key => `subscription_infoDialogue_${key}_${suffix}`)
                .map(key => exceptions[key] || key)
        }

        public t(id: string, ...args: string[]): string {
            const text = (args || []).reduce((result, arg, index) => {
                return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
            }, this.text[id] || id);
            return decodeHtml(text)
        }

        public t_html(id: string, ...args: string[]): string {
            return this
                .t(id, ...args)
                .split(/\n{2}/)
                .filter(t => t && t.trim().length > 0)
                .map(t => `<p>${t}</p>`)
                .join('')
                .replace(/\n/g, '<br/>')
        }

        public tabCopyForTitle(title: string): string {
            const copyIndex = this.tabTitleKeys.indexOf(title);
            return this.tabCopyKeys()[copyIndex];
        }

        public tabCopyKeys(): string[] {
            return this.tabTextKeys('copy');
        }
    }
</script>

<style scoped>

</style>
