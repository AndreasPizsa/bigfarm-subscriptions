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
                value: 'Level 1',
            },
            {
                monthFrom: 2,
                value: 'Level 2',
            },
            {
                monthFrom: 3,
                value: 'Level 3',
            },
            {
                monthFrom: 4,
                value: 'Level 4',
            },
            {
                monthFrom: 5,
                value: 'Level 5',
            },
            {
                monthFrom: 6,
                value: 'Level 6',
            }
        ]
    },
    {
        name: 'highLevelContracts',
        values: [
            {
                monthFrom: 1,
                value: 'Access',
            },
            {
                monthFrom: 2,
                value: 'Access',
            },
            {
                monthFrom: 3,
                value: 'Access',
            },
            {
                monthFrom: 4,
                value: 'Access',
            },
            {
                monthFrom: 5,
                value: 'Access',
            },
            {
                monthFrom: 6,
                value: 'Access',
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
                value: 'Access',
            },
            {
                monthFrom: 2,
                value: 'Access',
            },
            {
                monthFrom: 3,
                value: 'Access',
            },
            {
                monthFrom: 4,
                value: 'Access',
            },
            {
                monthFrom: 5,
                value: 'Access',
            },
            {
                monthFrom: 6,
                value: 'Access',
            }
        ]
    },
];
