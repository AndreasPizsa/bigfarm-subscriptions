<template>
    <div class="modal d-block" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Loyalty Bonus</h5>
                    <button type="button" class="close" @click="closeWindow()">
                        <span aria-hidden="true">&times</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Nice! {{amount}}</p>

                    <button type="button" class="btn btn-primary btn-block" @click="closeWindow()">Okay</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: "subscription-loyalty-bonus"
    })
    export default class SubscriptionLoyaltyBonus extends Vue {
        public amount!: number;

        public closeWindow(): void {
            window.parent.postMessage({
                name: 'cxf.subscriptions.close',
                frameId: (window.location as any).query.elementid
            }, '*');
        }

        public created(): void {
            this.amount = (window.location as any).query.amount;
        }
    }
</script>

<style scoped lang="scss">

</style>
