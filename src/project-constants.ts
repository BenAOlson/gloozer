import { Expansions, Campaigns } from 'types/types'

// const campaigns = ['GLOOMHAVEN', 'JOTL', 'FROSTHAVEN'] as const
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
  GLOOMHAVEN: {
    type: 'GLOOMHAVEN',
    name: 'Gloomhaven',
    expansions: {
      FC: { type: 'FC', name: 'Forgotten Circles' },
    },
  },
  JOTL: { type: 'JOTL', name: 'Jaws of the Lion' },
  FROSTHAVEN: { type: 'FROSTHAVEN', name: 'Frosthaven' },
}
export const expansionTypes: ExpansionTypes = {
  FC: { type: 'FC', name: 'Forgotten Circles', campgian: 'GLOOMHAVEN' },
}
