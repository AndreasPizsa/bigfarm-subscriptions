import {Prop} from 'vue-property-decorator';
import {IBoosterTier} from "@/domain/IBoosterTier";
import {distinct} from "@/core/helpers";
import {IPlan} from "@/domain/IPlan";
import {BaseComponent} from "@/components/base-component";

export abstract class BonusList extends BaseComponent {
    @Prop({required: true}) public plan!: IPlan;

    public get boosterData(): IBoosterTier[] {
        return this.plan.boosterTiers || [];
    }

    public get boosterTiers(): number[] {
        const data = this.boosterData
            .reduce<number[]>((set, {from}) => [...set, from], []);

        return distinct(data).sort((a, b) => a - b);
    }

    public get perks(): number[] {
        const data = this.boosterData
            .reduce<number[]>((result, {items}) => ([
                ...result,
                ...(items.map(([itemId]) => itemId))
            ]), []);

        return distinct(data);
    }
}
