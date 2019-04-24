<template>
    <span class="bigfarm__grow">
        <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list bigfarm__fit_height mt-0">
        <div class="d-flex flex-row">
          <img class="flex-shrink-1" style="cursor: pointer; bottom: -2px"
               :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" @click="goToPage(1)"/>
          <span class="flex-grow-1 text-center align-middle">{{ t('subscription_allianceProgress') }}</span>
        </div>

        <div class="bigfarm__table_box">
          <vue-scrolling-table
                  :scroll-horizontal="true"
                  :scroll-vertical="true"
                  :sync-header-scroll="true"
                  :sync-footer-scroll="true"
                  :include-footer="true"
                  dead-area-color="transparent"
                  :class="{ freezeFirstColumn: true, 'bigfarm-table_package_alliance': true }">
            <template slot="thead">
              <tr>
                  <th><div class="fill">{{ t('subscription_allianceBonuses') }}</div></th>
                <th v-for="tier in alliancePackBoosterTiers">{{tier}}</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="perkId in alliancePackPerks">
                <td class="fill">
                  <div class="fill  p-2">
                    <dl>
                      <dt><div class="thumbnail"><img alt="" :src="iconNameForItemId(perkId)" width="100%"
                                                      height="100%"/></div></dt>
                      <dd>
                        <h3>{{ t(textKeyForItemId(perkId).title) }}</h3>
                        <p>{{ t(textKeyForItemId(perkId).body) }}</p>
                      </dd>
                    </dl>
                  </div>
                </td>
                <td v-for="tier in alliancePackBoosterTiers">
                  {{ alliancePackBoosterPerkBoostForTier(perkId, tier) > 0 ? textKeyForItemId(perkId).prefix : '' }}{{ alliancePackBoosterPerkBoostForTier(perkId, tier) | xIfEmptyOrZero }}{{ alliancePackBoosterPerkBoostForTier(perkId, tier) > 0 ? textKeyForItemId(perkId).suffix : ''}}
                </td>
              </tr>
            </template>
          </vue-scrolling-table>
        </div>
      </div>
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import VueScrollingTable from "vue-scrolling-table";
    import {IPlan} from "@/domain/IPlan";
    import {IBoosterTier} from "@/domain/IBoosterTier";
    import {IDictionary} from "@/core/IDictionary";
    import {unique} from "@/core/helpers";
    import {allianceItemData, IAllianceItemData} from "@/components/alliance/allianceItemData";

    const decodeHtml = require('he').decode;

    @Component({
        name: "alliance-bonus-list",
        components: {
            VueScrollingTable,
        },
        filters: {
            xIfEmptyOrZero(value: string): string {
                return value || '–'
            }
        },
    })
    export default class AllianceBonusList extends Vue {
        @Prop({required: true}) public plan!: IPlan;
        @Prop({required: true}) public text!: IDictionary<string>;

        public get alliancePackBoosterData(): IBoosterTier[] {
            return this.plan.boosterTiers || [];
        }

        public get alliancePackBoosterTiers(): number[] {
            return this
                .alliancePackBoosterData
                .reduce<number[]>((set, {from}) => [...set, from], [])
                .filter(unique)
                .sort((a, b) => a - b);
        };

        public get alliancePackPerks(): number[] {
            return this
                .alliancePackBoosterData
                .reduce<number[]>((result, {items}) => ([
                    ...result,
                    ...(items.map(([itemId]) => itemId))
                ]), [])
                .filter(unique);
        }

        public t(id: string, ...args: string[]): string {
            const text = (args || []).reduce((result, arg, index) => {
                if (!result) {
                    debugger;
                }
                return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
            }, this.text[id] || id);
            return decodeHtml(text)
        }

        public itemDataForId(id: number): IAllianceItemData {
            return allianceItemData[id];
        }

        public iconNameForItemId(id: number): string {
            return 'images/' + require('lodash.snakecase')(`${this.itemDataForId(id)[0]}_med`) + '.png'
        }

        public goToBonusList(): void {
            this.$emit('go-to-bonus-list');
        }

        public alliancePackBoosterPerkBoostForTier(perkId: number, tier: number): number | undefined {
            const tierData = this.alliancePackBoosterData.find(({from}) => from >= tier);
            if (tierData && tierData.items) {
                let item = tierData.items.find(([id]) => id == perkId);
                return item ? item[1] : undefined;
            }
        }

        public textKeyForItemId(id: number): any {
            const itemData = this.itemDataForId(id);

            return {
                title: `subscription_perkAlliance_${itemData[0]}_title`,
                body: `subscription_perkAlliance_${itemData[0]}_desc`,
                prefix: itemData[1] || '',
                suffix: itemData[2] || ''
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
