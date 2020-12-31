import { Campaigns, Expansions } from 'types/types'

export type GameSet = Campaigns | Expansions
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
    set: 'Gloomhaven',
    health: 'HIGH',
  },
]

export type PlayerClass = {
  name: string
  abbrev?: string
  race: Race
  gameset: GameSet
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
    gameset: 'Gloomhaven',
    health: 'HIGH',
    color: '#6DD0E5',
    defaultUnlocked: true,
  },
  {
    name: 'Cragheart',
    race: 'Savvas',
    gameset: 'Gloomhaven',
    health: 'HIGH',
    color: '#939C41',
    defaultUnlocked: true,
  },
  {
    name: 'Scoundrel',
    race: 'Human',
    gameset: 'Gloomhaven',
    health: 'MED',
    color: '#88C54C',
    defaultUnlocked: true,
  },
  {
    name: 'Mindthief',
    race: 'Vermling',
    gameset: 'Gloomhaven',
    health: 'LOW',
    color: '#6480AF',
    defaultUnlocked: true,
  },
  {
    name: 'Spellweaver',
    race: 'Orchid',
    gameset: 'Gloomhaven',
    health: 'LOW',
    color: '#A17AB3',
    defaultUnlocked: true,
  },
  {
    name: 'Tinkerer',
    race: 'Quatryl',
    gameset: 'Gloomhaven',
    health: 'MED',
    color: '#BBA188',
    defaultUnlocked: true,
  },
  {
    name: 'Doomstalker',
    abbrev: 'DS',
    race: 'Orchid',
    gameset: 'Gloomhaven',
    health: 'MED',
    color: '#37A7CD',
  },
  {
    name: 'Sunkeeper',
    abbrev: 'SK',
    race: 'Valrath',
    gameset: 'Gloomhaven',
    health: 'HIGH',
    color: '#FADD79',
  },
  {
    name: 'Summoner',
    abbrev: 'SM',
    race: 'Aesther',
    gameset: 'Gloomhaven',
    health: 'MED',
    color: '#C75C8A',
  },
  {
    name: 'Nightshroud',
    abbrev: 'NS',
    race: 'Aesther',
    gameset: 'Gloomhaven',
    health: 'MED',
    color: '#696DB4',
  },
  {
    name: 'Elementalist',
    abbrev: 'EL',
    race: 'Savvas',
    gameset: 'Gloomhaven',
    health: 'LOW',
    color: '#9E9E9E',
  },
  {
    name: 'Soothsinger',
    abbrev: 'SS',
    race: 'Quatryl',
    gameset: 'Gloomhaven',
    health: 'LOW',
    color: '#E17267',
  },
  {
    name: 'Quartermaster',
    abbrev: 'QM',
    race: 'Valrath',
    gameset: 'Gloomhaven',
    health: 'HIGH',
    color: '#D98735',
  },
  {
    name: 'Plagueherald',
    abbrev: 'PH',
    race: 'Harrower',
    gameset: 'Gloomhaven',
    health: 'HIGH',
    color: '#45928C',
  },
  {
    name: 'Berserker',
    abbrev: 'BS',
    race: 'Inox',
    gameset: 'Gloomhaven',
    health: 'HIGH',
    color: '#C75847',
  },
  {
    name: 'Beast Tyrant',
    abbrev: 'BT',
    race: 'Vermling',
    gameset: 'Gloomhaven',
    health: 'LOW',
    color: '#A67765',
    companion: 'Bear',
  },
  {
    name: 'Sawbones',
    abbrev: 'SB',
    race: 'Human',
    gameset: 'Gloomhaven',
    health: 'MED',
    color: '#F8F8F6',
  },
  //*---------------------------------*//
  //*       Forgotten Circles         *//
  //*---------------------------------*//
  {
    name: 'Diviner',
    race: 'Aesther',
    gameset: 'Forgotten Circles',
    health: 'LOW',
    color: '#83C1D0',
    defaultUnlocked: true,
  },
]

export default playerClasses
