type ILoyaltyTier = {
    monthFrom: number,
    value: string,
}

export type ILoyaltyBonus = {
    name: string,
    values: ILoyaltyTier[],
};

export const loyaltyBonusList: ILoyaltyBonus[] = [
    {
        name: 'bonusGold',
        values: [
            {
                monthFrom: 1,
                value: '+10%',
            },
            {
                monthFrom: 2,
                value: '+12%',
            },
            {
                monthFrom: 3,
                value: '+14%',
            },
            {
                monthFrom: 4,
                value: '+16%',
            },
            {
                monthFrom: 5,
                value: '+18%',
            },
            {
                monthFrom: 6,
                value: '+20%',
            }
        ]
    },
    {
        name: 'eventSeedsBooks',
        values: [
            {
                monthFrom: 1,
                value: 'level 1',
            },
            {
                monthFrom: 2,
                value: 'level 2',
            },
            {
                monthFrom: 3,
                value: 'level 3',
            },
            {
                monthFrom: 4,
                value: 'level 4',
            },
            {
                monthFrom: 5,
                value: 'level 5',
            },
            {
                monthFrom: 6,
                value: 'level 6',
            }
        ]
    },
    {
        name: 'highLevelContracts',
        values: [
            {
                monthFrom: 1,
                value: 'access',
            },
            {
                monthFrom: 2,
                value: 'access',
            },
            {
                monthFrom: 3,
                value: 'access',
            },
            {
                monthFrom: 4,
                value: 'access',
            },
            {
                monthFrom: 5,
                value: 'access',
            },
            {
                monthFrom: 6,
                value: 'access',
            }
        ]
    },
    {
        name: 'wofSpinsReduced',
        values: [
            {
                monthFrom: 1,
                value: '-1',
            },
            {
                monthFrom: 2,
                value: '-1',
            },
            {
                monthFrom: 3,
                value: '-1',
            },
            {
                monthFrom: 4,
                value: '-1',
            },
            {
                monthFrom: 5,
                value: '-1',
            },
            {
                monthFrom: 6,
                value: '-1',
            }
        ]
    },
    {
        name: 'rainbowRoses',
        values: [
            {
                monthFrom: 1,
                value: 'access',
            },
            {
                monthFrom: 2,
                value: 'access',
            },
            {
                monthFrom: 3,
                value: 'access',
            },
            {
                monthFrom: 4,
                value: 'access',
            },
            {
                monthFrom: 5,
                value: 'access',
            },
            {
                monthFrom: 6,
                value: 'access',
            }
        ]
    },
];
