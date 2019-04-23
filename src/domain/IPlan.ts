import {IBoosterTier} from "@/domain/IBoosterTier";

export type IPlan = {
    boosterTiers: IBoosterTier[];
    wasCancelled: boolean;
    checkoutUrl: string;
    validUntil: string;
    id: string,
    price: string,
    currency: string,
}
