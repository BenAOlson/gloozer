import { Expansions, Campaigns } from 'types/types'

// const campaigns = ['Gloomhaven', 'Jaws of the Lion', 'Frosthaven'] as const
export type ExpansionTypes = Record<
  Expansions,
  {
    type: Expansions
    name: string
    campgian: Campaigns
  }
>
type CampaignTypes = Record<
  Campaigns,
  {
    type: Campaigns
    name: string
    expansions?: Record<
      Expansions,
      {
        type: Expansions
        name: string
      }
    >
  }
>

export const campaignTypes: CampaignTypes = {
  Gloomhaven: {
    type: 'Gloomhaven',
    name: 'Gloomhaven',
    expansions: {
      'Forgotten Circles': {
        type: 'Forgotten Circles',
        name: 'Forgotten Circles',
      },
    },
  },
  'Jaws of the Lion': { type: 'Jaws of the Lion', name: 'Jaws of the Lion' },
  Frosthaven: { type: 'Frosthaven', name: 'Frosthaven' },
}
export const expansionTypes: ExpansionTypes = {
  'Forgotten Circles': {
    type: 'Forgotten Circles',
    name: 'Forgotten Circles',
    campgian: 'Gloomhaven',
  },
}

export const gamesetTypes: CampaignTypes & ExpansionTypes = {
  ...campaignTypes,
  ...expansionTypes,
}
