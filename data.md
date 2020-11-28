#Database

##Notes
* Should events get there own tree?
  * For:
    * Easier to separate stuff?
  * Against:
    * More complicated to get data needed
* Should monsters be an array, or obect with number as key?
  * Could all monsters be added with isActive flag like I had been doing?
* Figure out how to structure player characters/summons/allies/monsters

##Structure
* users (uid)
  * email
  * displayName
  * photoURL
  * parties[]
    * uuid
    * displayName
    * iconName
    * isAdmin?? //maybe? Could be useful for display purpose, but not sure what else
 
* parties (uuid)
  * displayName
  * iconName
  * users[]
    * uid
    * displayName
    * photoURL??
    * isAdmin??
    * ???
  * admins[]??
    * uid
  * scenarios[]
    * uuid
    * scenarioId (general scenario id, *e.g., id of Scenario #1 from book*)
    * date
    * isWin ??
    * result ??
  * stats? (should this be here, or just aggregated from other stats?)
    * TBD
 
* scenarios (uuid) (*actual completed scenarios, not like, Scenario #1 from book*)
  * scenarioId (general scenario id, *e.g., id of Scenario #1 from book*)
  * set ('GLOOMHAVEN' | 'FC' | 'JOTL' | 'FROSTHAVEN' )
  * startTime
  * ?endTime
  * level
  * isCompleted??
  * isInProgress??
  * isWin??
  * status ('IN_PROGRESS' | 'SUCCEEDED' | 'FAILED')??
  * goodGuys[]
    * characters[]
      * uuid
      * displayName
      * class
      * gold
      * scenarioXP
      * isExhausted??
    * summons[]
      * currentHealth
      * maxHealth
      * baseShield
      * currentShield
      * owner //character uuid
    * monsterAllies
      * TBD
  * users[]??
    * uid
    * displayName
    * photoURL??
  * monsterTypes[]
    * monsterName
    * level
  * monsters[]
    * [monster name][]
      * baseShield: number
      * currentHealth: number
      * currentShield: number
      * isActive??: boolean //probably don't need this
      * isElite: boolean
      * isSummon: boolean
      * maxHealth: number
      * mNumber: number
  * events[]
    * type ('ADD_MONSTERS' | 'SUMMON' | 'HEALTH' | 'STATUS' | 'CARD_EXHAUST' | 'LOOT' [ |'GENERAL'??])[]
    * ?monstersAdded[]
      * monsterName
      * monsterNumber
      * ?isElite //can probably be optional
      * ?isSummon //can probably be optional
    * ?actor //if it is a type that included a player?
      * type ('player' | 'monster' | 'summon' [ | 'ally'??])
      * ?character (uuid)
      * ?user (uid)
      * ?monster (id)
    * ?receivor
      * type ('player' | 'monster' | 'summon' [ | 'ally'??])
      * ?character (uuid)
      * ?user (uid)
      * ?monster (id)
    * ?summon[]
      * summonName
      * maxHealth
      * baseShield
      * owner //character uuid

* characters (uuid)
  * displayName
  * class
  * level
  * gold
  * xp