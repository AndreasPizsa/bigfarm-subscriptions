import {IDictionary} from "@/core/IDictionary";

export type EnthusiastItemDataKey = string;
export type EnthusiastItemDataPattern = string;
export type IEnthusiastItemData = [EnthusiastItemDataKey, EnthusiastItemDataPattern];
export const enthusiastItemData: IDictionary<IEnthusiastItemData> = {
    72002: ['bonusGold', '"+$value%"'],
    72004: ['eventSeedsBooks', '"Level $value"'],
    72006: ['highLevelContracts', '$value ? "Access" : "-"'],
    72014: ['wofSpinsReduced', '"$value"'],
    72015: ['rainbowRoses', '$value ? "Access" : "-"'],
};
