import {Prop, Vue} from 'vue-property-decorator';
import {IBoosterTier} from "@/domain/IBoosterTier";
import {distinct} from "@/core/helpers";
import {IPlan} from "@/domain/IPlan";

export abstract class BonusList extends Vue {
    @Prop({required: true}) public plan!: IPlan;

    public get alliancePackBoosterData(): IBoosterTier[] {
        return this.plan.boosterTiers || [];
    }

    public get alliancePackBoosterTiers(): number[] {
        const data = this.alliancePackBoosterData
            .reduce<number[]>((set, {from}) => [...set, from], []);

        return distinct(data).sort((a, b) => a - b);
    }

    public get alliancePackPerks(): number[] {
        const data = this.alliancePackBoosterData
            .reduce<number[]>((result, {items}) => ([
                ...result,
                ...(items.map(([itemId]) => itemId))
            ]), []);
        
        return distinct(data);
    }
}
