import {IBoosterTier} from "@/domain/IBoosterTier";

export enum SubscriptionType {
    Individual = 'individualSubscription',
    Alliance = 'allianceSubscription',
    Enthusiast = 'enthusiastSubscription',
}

export type IPlan = {
    allianceName?: string;
    allianceSubscriberCount?: number;
    otherAllianceSubscribers?: number;
    boosterTiers: IBoosterTier[];
    isAllianceMember?: boolean;
    wasCancelled?: boolean;
    checkoutUrl: string;
    validUntil?: string;
    id: SubscriptionType,
    price: number,
    currency: string,
    duration: number;
}
