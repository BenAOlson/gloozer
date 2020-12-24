import { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type BoolSetState = SetState<boolean>

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
}
export type PartyData = {
  displayName: string
  iconName: string
  users: {
    [key: string]: PartyUser
  }
}
