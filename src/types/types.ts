import { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type BoolSetState = SetState<boolean>

export type Campaigns = 'GLOOMHAVEN' | 'JOTL' | 'FROSTHAVEN'
export type Expansions = 'FC'

export type UserParty = {
  partyId: string
  displayName: string
  iconName: string
}
export type User = {
  uid: string
  displayName: string
  email: string
  photoURL: string
  parties?: {
    [key: string]: UserParty
    // [key: string]: boolean
  }
}

export type PartyUser = {
  displayName: string
  photoUrl: string
  isAdmin?: true
}
export type PartyData = {
  displayName: string
  iconName: string
  campaignType: string
  users: {
    [key: string]: PartyUser
  }
  expansions?: {
    [key: string]: true
  }
  unclockedClasses: {
    [key: string]: true
  }
}
