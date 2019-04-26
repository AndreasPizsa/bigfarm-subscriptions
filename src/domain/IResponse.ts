import {IDictionary} from "@/core/IDictionary";
import {IPlan} from "@/domain/IPlan";

export type ILocale = IDictionary<string>;

export type IResponse = {
    i18n: ILocale;
    payoutTypes: IPlan[];
}
