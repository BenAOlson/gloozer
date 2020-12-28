import { Campaigns, Expansions } from 'types/types'

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
  color: string
  defaultUnlocked?: boolean
  companion?: CompanionName
}
const playerClasses: PlayerClass[] = [
  //*---------------------------------*//
  //*           Gloomhaven            *//
  //*---------------------------------*//
  {
    name: 'Brute',
    race: 'Inox',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    color: '#6DD0E5',
    defaultUnlocked: true,
  },
  {
    name: 'Cragheart',
    abbrev: 'CH',
    race: 'Savvas',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    color: '#939C41',
    defaultUnlocked: true,
  },
  {
    name: 'Scoundrel',
    abbrev: 'SC',
    race: 'Human',
    set: 'GLOOMHAVEN',
    health: 'MED',
    color: '#88C54C',
    defaultUnlocked: true,
  },
  {
    name: 'Mindthief',
    abbrev: 'MT',
    race: 'Vermling',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    color: '#6480AF',
    defaultUnlocked: true,
  },
  {
    name: 'Spellweaver',
    abbrev: 'SW',
    race: 'Orchid',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    color: '#A17AB3',
    defaultUnlocked: true,
  },
  {
    name: 'Tinkerer',
    abbrev: 'TK',
    race: 'Quatryl',
    set: 'GLOOMHAVEN',
    health: 'MED',
    color: '#BBA188',
    defaultUnlocked: true,
  },
  {
    name: 'Doomstalker',
    abbrev: 'DS',
    race: 'Orchid',
    set: 'GLOOMHAVEN',
    health: 'MED',
    color: '#37A7CD',
  },
  {
    name: 'Sunkeeper',
    abbrev: 'SK',
    race: 'Valrath',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    color: '#FADD79',
  },
  {
    name: 'Summoner',
    abbrev: 'SM',
    race: 'Aesther',
    set: 'GLOOMHAVEN',
    health: 'MED',
    color: '#C75C8A',
  },
  {
    name: 'Nightshroud',
    abbrev: 'NS',
    race: 'Aesther',
    set: 'GLOOMHAVEN',
    health: 'MED',
    color: '#696DB4',
  },
  {
    name: 'Elementalist',
    abbrev: 'EL',
    race: 'Savvas',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    color: '#9E9E9E',
  },
  {
    name: 'Soothsinger',
    abbrev: 'SS',
    race: 'Quatryl',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    color: '#E17267',
  },
  {
    name: 'Quartermaster',
    abbrev: 'QM',
    race: 'Valrath',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    color: '#D98735',
  },
  {
    name: 'Plagueherald',
    abbrev: 'PH',
    race: 'Harrower',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    color: '#45928C',
  },
  {
    name: 'Berserker',
    abbrev: 'BS',
    race: 'Inox',
    set: 'GLOOMHAVEN',
    health: 'HIGH',
    color: '#C75847',
  },
  {
    name: 'Beast Tyrant',
    abbrev: 'BT',
    race: 'Vermling',
    set: 'GLOOMHAVEN',
    health: 'LOW',
    color: '#A67765',
    companion: 'Bear',
  },
  {
    name: 'Sawbone',
    abbrev: 'SB',
    race: 'Human',
    set: 'GLOOMHAVEN',
    health: 'MED',
    color: '#F8F8F6',
  },
  //*---------------------------------*//
  //*       Forgotten Circles         *//
  //*---------------------------------*//
  {
    name: 'Diviner',
    abbrev: 'DV',
    race: 'Aesther',
    set: 'FC',
    health: 'LOW',
    color: '#83C1D0',
    defaultUnlocked: true,
  },
]

export default playerClasses
