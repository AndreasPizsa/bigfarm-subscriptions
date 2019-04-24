<template>
    <span class="bigfarm__grow">
        <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list bigfarm__fit_height mt-0">
        <div class="d-flex flex-row">
          <img class="flex-shrink-1" style="cursor: pointer; bottom: -2px"
               :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" @click="goToBonusList"/>
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
                  :class="{ freezeFirstColumn: true, enthusiastPackage: true }">
            <template slot="thead">
              <tr>
                <th class="overflow-visible">
                  <div class="fill bigfarm-table-box__title_package_enthusiast">{{ t('subscription_allianceBonuses') }}</div>
                  <img src="../assets/images/loyalty_badge_med.svg" class="bigfarm-table-box__badge"/>
                </th>
                <th v-for="tier in alliancePackBoosterTiers">
                  <img src="../assets/images/calendar_big.svg" class="bigfarm-table-th__badge">
                  <span>{{tier}}</span>
                </th>
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
                        <h3>{{ t(perkTitle(perkId)) }}</h3>
                        <p>{{ t(perkDesc(perkId)) }}</p>
                      </dd>
                    </dl>
                  </div>
                </td>
                <td v-for="tier in alliancePackBoosterTiers">
                  {{ perkValue(perkId, tier) }}
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
    import {enthusiastItemData, IEnthusiastItemData} from "@/components/EnthusiastItemData";

    const decodeHtml = require('he').decode;

    @Component({
        name: "enthusiast-bonus-list",
        components: {
            VueScrollingTable,
        },
    })
    export default class EnthusiastBonusList extends Vue {
        @Prop({required: true}) public plan!: IPlan;
        @Prop({required: true}) public text!: IDictionary<string>;

        public get alliancePackBoosterData(): IBoosterTier[] {
            return this.plan.boosterTiers || [];
        }

        public get alliancePackBoosterTiers(): number[] {
            const allTiers = this
                .alliancePackBoosterData
                .reduce((set, {from}) => set.add(from), new Set<number>());
            return Array.from(allTiers).sort((a, b) => a - b);
        }

        public get alliancePackPerks(): number[] {
            const allPerks = this
                .alliancePackBoosterData
                .reduce<number[]>((result, {items}) => ([
                    ...result,
                    ...(items.map(([itemId]) => itemId))
                ]), []);
            return Array.from(new Set(allPerks))
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

        public itemDataForId(id: number): IEnthusiastItemData {
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

        public perkValue(perkId: number, tier: number): string {
            const [key, pattern] = this.itemDataForId(perkId);
            let output = '';
            try {
                output = eval(pattern.replace("$value", tier.toString(10)));
            } catch (e) {
                throw new Error(`Pattern is incorrect (perkId: ${perkId}, tier: ${tier}, ${pattern})`)
            }

            return output;
        }

        public iconNameForItemId(id: number): string {
            return 'images/' + require('lodash.snakecase')(`${this.itemDataForId(id)[0]}_med`) + '.png'
        }

        public goToBonusList(): void {
            this.$emit('go-to-bonus-list');
        }
    }
</script>

<style scoped lang="scss">
    .bigfarm-table-box__badge {
        position: absolute;
        top: 0px;
        right: 2px;
        height: 1.5rem;
    }

    .enthusiastPackage {
        th {
            &:before {
                display: none;
            }
        }
    }

    .bigfarm-table-th__badge {
        height: 1rem;
        margin-right: 1px;
    }
</style>
