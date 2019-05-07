<template>
    <div class="modal d-block" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{t('subscription_bonusGoldConfirmation_title')}}</h5>
                    <button type="button" class="close" @click="closeWindow()">
                        <span aria-hidden="true">&times</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{t('subscription_bonusGoldConfirmation_copy')}}</p>

                    <h5 class="text-center">x{{amount}}</h5>

                    <button type="button" class="btn btn-primary btn-block" @click="closeWindow()">Okay</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {dataProvider} from "@/services/dataProvider";
    import {BaseComponent} from "@/components/base-component";
    import {IDictionary} from "@/core/IDictionary";

    @Component({
        name: "subscription-loyalty-bonus"
    })
    export default class SubscriptionLoyaltyBonus extends BaseComponent {
        protected text: IDictionary<string> = {};
        public amount!: number;

        public closeWindow(): void {
            window.parent.postMessage({
                name: 'cxf.subscriptions.close',
                frameId: (window.location as any).query.elementid
            }, '*');
        }

        public created(): void {
            this.amount = (window.location as any).query.amount;
            dataProvider.fetch()
                .then(() => {
                    this.text = dataProvider.text;
                })

        }
    }
</script>

<style scoped lang="scss">

</style>
