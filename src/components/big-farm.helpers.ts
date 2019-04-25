import {IPlan, SubscriptionType} from "@/domain/IPlan";

export function isIndividualSubscription(plan: IPlan): boolean {
    return plan.id === SubscriptionType.Individual;
}

export function isAllianceSubscription(plan: IPlan): boolean {
    return plan.id === SubscriptionType.Alliance;
}

export function isEnthusiastSubscription(plan: IPlan): boolean {
    return plan.id === SubscriptionType.Enthusiast;
}
