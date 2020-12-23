type MonsterNames =
  | 'Aesther Ashblade'
  | 'Aesther Scout'
  | 'Ancient Artillery'
  | 'Bandit Archer'
  | 'Bandit Guard'
  | 'Black Imp'
  | 'Cave Bear'
  | 'City Archer'
  | 'City Guard'
  | 'Cultist'
  | 'Deep Terror'
  | 'Earth Demon'
  | 'Flame Demon'
  | 'Frost Demon'
  | 'Forest Imp'
  | 'Giant Viper'
  | 'Hound'
  | 'Harrower Infester'
  | 'Inox Archer'
  | 'Inox Guard'
  | 'Inox Shaman'
  | 'Living Bones'
  | 'Living Corpse'
  | 'Living Spirit'
  | 'Lurker'
  | 'Night Demon'
  | 'Ooze'
  | 'Rending Drake'
  | 'Savvas Icestorm'
  | 'Savvas Lavaflow'
  | 'Spitting Drake'
  | 'Stone Golem'
  | 'Sun Demon'
  | 'Valrath Savage'
  | 'Valrath Tracker'
  | 'Vermling Scout'
  | 'Vermling Shaman'
  | 'Wind Demon'

type BossNames =
  | 'Bandit Commander'
  | 'The Betrayer'
  | 'Captain of the Guard'
  | 'The Colorless'
  | 'Dark Rider'
  | 'Elder Drake'
  | 'The Gloom'
  | 'Inox Bodyguard'
  | 'Manifestation of Corruption'
  | 'Merciless Overseer'
  | 'Prime Demon'
  | 'The Sightless Eye'
  | 'Valrath Commander'
  | 'Winged Horror'
  | 'Jekserah'

type ScenarioMonsters = {
  name: MonsterNames | 'special'
  levelMod?: number
  health?: string
}

type ScenarioBoss = {
  name: BossNames
}

type ScenarioNames =
  | 'Abandoned Sewers'
  | 'Forgotten Crypt'
  | "Necromancer's Sanctum"

type Scenario = {
  name: ScenarioNames
  enemies?: ScenarioMonsters[]
  allies?: ScenarioMonsters[]
  bosses?: ScenarioBoss
}

export const gloomhavenScenarios: Scenario[] = [
  {
    name: 'Forgotten Crypt',
    enemies: [
      {
        name: 'Cultist',
      },
      {
        name: 'Living Bones',
      },
      {
        name: 'Living Spirit',
      },
      {
        name: 'Living Corpse',
      },
    ],
  },
]
