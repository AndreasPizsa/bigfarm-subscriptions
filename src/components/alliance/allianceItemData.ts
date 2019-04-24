import {IDictionary} from "@/core/IDictionary";

export type IAllianceItemData = string[];

export const allianceItemData: IDictionary<IAllianceItemData> = {
    72002: ['contractMaterial', '-', '%'],
    72004: ['fishcontractMaterial', '-', '%'],
    72006: ['xpBooster', '+'],
    72014: ['coopVillageConstructionCosts', '-', '%'],
    72015: ['coopVillageConstructionDuration', '-', '%'],
    72003: ['contractCash', '+', '%'],
    72005: ['fishcontractCash', '+', '%'],
    72009: ['coopResearchCost', '-', '%'],
    72010: ['coopProjectDuration', '+', '%'],
    72016: ['coopVillageBoostLumbermill', '+', '%'],
    72017: ['coopVillageBoostBrickyard', '+', '%'],
    72013: ['seasonSpecialistOutcome', '+', '%'],
    72011: ['edgePlantOutcome', '+', '%'],
    72012: ['fieldDamageReduce', '-', '%'],
    72008: ['horseTrainingCost', '-', '%'],
    72007: ['tempConstructionSlot', '-']
};
