import {IDictionary} from "@/core/IDictionary";
import {IPlan} from "@/domain/IPlan";

export class DataProvider {
    public catalogUrl: string = '';
    public text!: IDictionary<string>;
    private payoutTypes: IDictionary<IPlan> = {};

    public async fetch(): Promise<void> {
        const response = await fetch(this.catalogUrl);
        const {i18n, payoutTypes} = await response.json();
        this.text = i18n;
        this.payoutTypes = payoutTypes;
    }
}

export const dataProvider = new DataProvider();
