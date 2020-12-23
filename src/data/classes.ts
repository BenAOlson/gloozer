import { Campaigns, Expansions } from '@constants'

type GameSet = Campaigns | Expansions
type Health = 'LOW' | 'MED' | 'HIGH'
type Race =
  | 'Valrath'
  | 'Orchid'
  | 'Aesther'
  | 'Savvas'
  | 'Quatryl'
  | 'Harrower'
  | 'Inox'
  | 'Vermling'
  | 'Human'

type CompanionName = 'Bear'
type Companion = {
  name: CompanionName
  set: GameSet
  health: Health
}
export const companions: Companion[] = [
  {
    name: 'Bear',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
  },
]

type PlayerClass = {
  name: string
  abbrev?: string
  race: Race
  set: GameSet
  health: Health
  defaultUnlocked?: boolean
  companion?: CompanionName
}
const playerClasses: PlayerClass[] = [
  {
    name: 'Brute',
    race: 'Inox',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    defaultUnlocked: true,
  },
  {
    name: 'Cragheart',
    abbrev: 'CH',
    race: 'Savvas',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    defaultUnlocked: true,
  },
  {
    name: 'Scoundrel',
    abbrev: 'SC',
    race: 'Human',
    set: 'GLOOMHAVEN',
    health: 'MED',
    defaultUnlocked: true,
  },
  {
    name: 'Mindthief',
    abbrev: 'MT',
    race: 'Vermling',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    defaultUnlocked: true,
  },
  {
    name: 'Spellweaver',
    abbrev: 'SW',
    race: 'Orchid',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    defaultUnlocked: true,
  },
  {
    name: 'Tinkerer',
    abbrev: 'TK',
    race: 'Quatryl',
    set: 'GLOOMHAVEN',
    health: 'MED',
    defaultUnlocked: true,
  },
  {
    name: 'Doomstalker',
    abbrev: 'DS',
    race: 'Orchid',
    set: 'GLOOMHAVEN',
    health: 'MED',
  },
  {
    name: 'Sunkeeper',
    abbrev: 'SK',
    race: 'Valrath',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
  },
  {
    name: 'Summoner',
    abbrev: 'SM',
    race: 'Aesther',
    set: 'GLOOMHAVEN',
    health: 'MED',
  },
  {
    name: 'Nightshroud',
    abbrev: 'NS',
    race: 'Aesther',
    set: 'GLOOMHAVEN',
    health: 'MED',
  },
  {
    name: 'Elementalist',
    abbrev: 'EL',
    race: 'Savvas',
    set: 'GLOOMHAVEN',
    health: 'LOW',
  },
  {
    name: 'Soothsinger',
    abbrev: 'SS',
    race: 'Quatryl',
    set: 'GLOOMHAVEN',
    health: 'LOW',
  },
  {
    name: 'Quartermaster',
    abbrev: 'QM',
    race: 'Valrath',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
  },
  {
    name: 'Plagueherald',
    abbrev: 'PH',
    race: 'Harrower',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
  },
  {
    name: 'Berserker',
    abbrev: 'BS',
    race: 'Inox',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
  },
  {
    name: 'Beast Tyrant',
    abbrev: 'BT',
    race: 'Vermling',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    companion: 'Bear',
  },
  {
    name: 'Sawbone',
    abbrev: 'SB',
    race: 'Human',
    set: 'GLOOMHAVEN',
    health: 'MED',
  },
  {
    name: 'Diviner',
    abbrev: 'DV',
    race: 'Aesther',
    set: 'FC',
    health: 'LOW',
    defaultUnlocked: true,
  },
]

export default playerClasses
