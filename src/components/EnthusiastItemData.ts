import {IDictionary} from "@/core/IDictionary";

export type EnthusiastItemDataKey = string;
export type EnthusiastItemDataPattern = string;
export type IEnthusiastItemData = [EnthusiastItemDataKey, EnthusiastItemDataPattern];
export const enthusiastItemData: IDictionary<IEnthusiastItemData> = {
    72002: ['additionalGoldOnPurchase', '"+$value%"'],
    72004: ['exclusiveLibraryBooks', '"Level $value"'],
    72006: ['highLevelContracts', '$value ? "Access" : "-"'],
    72014: ['efficientSpins', '"-$value"'],
    72015: ['rainbowRoses', '$value ? "Access" : "-"'],

    72003: ['contractCash', ''],
    72005: ['fishcontractCash', ''],
    72009: ['coopResearchCost', ''],
    72010: ['coopProjectDuration', ''],
    72016: ['coopVillageBoostLumbermill', ''],
    72017: ['coopVillageBoostBrickyard', ''],
    72013: ['seasonSpecialistOutcome', ''],
    72011: ['edgePlantOutcome', ''],
    72012: ['fieldDamageReduce', ''],
    72008: ['horseTrainingCost', ''],
    72007: ['tempConstructionSlot', '']
};
