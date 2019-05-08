<template>
    <span class="bigfarm__grow">
        <div class="bigfarm__pack bigfarm__pack_v2 bigfarm__cooperative_bonus_list bigfarm__fit_height mt-0">
        <div class="d-flex flex-row">
          <img class="flex-shrink-1" style="cursor: pointer; bottom: -2px"
               :src="require('@/assets/images/bigfarm__icon_back.svg')" alt="Back" @click="goToBonusList"/>
          <span class="flex-grow-1 text-center align-middle">{{ t('subscription_packageLoyalty_loyalty_tt') }}</span>
        </div>

        <div class="bigfarm__table_box">
          <vue-scrolling-table
                  :scroll-horizontal="true"
                  :scroll-vertical="true"
                  :sync-header-scroll="true"
                  :sync-footer-scroll="true"
                  :include-footer="true"
                  dead-area-color="transparent"
                  :class="{ freezeFirstColumn: true, 'bigfarm-table_package_enthusiast': true }">
            <template slot="thead">
              <tr>
                <th class="overflow-visible">
                    <div class="fill">
                        <div class="bigfarm-table-box__title_package_enthusiast">{{ t('subscription_allianceBonuses') }}</div>
                        <img src="../../assets/images/loyalty_badge_med.svg" class="bigfarm-table-box__badge"/>
                    </div>
                </th>
                <th v-for="month in monthList">
                  <img src="../../assets/images/calendar_big.svg" class="bigfarm-table-th__badge">
                  <span>{{month}}</span>
                </th>
           </tr>
            </template>
            <template slot="tbody">
              <tr v-for="perk in bonusList">
                <td>
                  <div class="fill p-2">
                    <dl>
                      <dt>
                          <div class="thumbnail">
                              <img class="thumbnail__image" alt="" :src="iconNameForItemId(perk.name)"/>
                          </div>
                      </dt>
                      <dd>
                        <h3>{{ t(perkTitle(perk.name)) }}</h3>
                        <p>{{ t(perkDesc(perk.name)) }}</p>
                      </dd>
                    </dl>
                  </div>
                </td>
                <td v-for="tier in perk.values">
                  {{ t(tier.value) }}
                </td>
              </tr>
            </template>
          </vue-scrolling-table>
        </div>
      </div>
    </span>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import VueScrollingTable from "vue-scrolling-table";
    import {IDictionary} from "@/core/IDictionary";
    import {ILoyaltyBonus, loyaltyBonusList} from "@/components/enthusiast/enthusiastItemData";
    import {BonusList} from "@/components/bonus-list";

    @Component({
        name: "enthusiast-bonus-list",
        components: {
            VueScrollingTable,
        },
    })
    export default class EnthusiastBonusList extends BonusList {
        @Prop({required: true}) public text!: IDictionary<string>;

        public perkTitle(perkId: string): string {
            return `subscription_perkLoyalty_${perkId}_title`;
        }

        public perkDesc(perkId: string): string {
            return `subscription_perkLoyalty_${perkId}_desc`;
        }

        public iconNameForItemId(id: string): string {
            return require(`@/assets/images/${id}.svg`);
        }

        public goToBonusList(): void {
            this.$emit('go-to-bonus-list');
        }

        public get bonusList(): ILoyaltyBonus[] {
            return loyaltyBonusList;
        }

        public get monthList(): number[] {
            let numbers = loyaltyBonusList[0].values.map(({monthFrom}) => monthFrom);
            return numbers;
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

    .bigfarm-table-th__badge {
        height: 1rem;
        margin-right: 1px;
    }

    .thumbnail__image {
        height: 2rem;
    }
</style>
