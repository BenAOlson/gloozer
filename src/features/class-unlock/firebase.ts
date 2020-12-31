import { KeyTrue, PartyData } from 'types/types'
import firebase from 'firebase/app'

export const updateUnlockedClasses = async (
  newClasses: string[],
  removedClasses: string[],
  party: PartyData
): Promise<void> => {
  const origUnlockedClasses = { ...party.unlockedClasses }
  const db = firebase.database()
  const ref = db.ref(`parties/${party.uid}/unlockedClasses`)
  const origClassesMinusRemoved = Object.keys(
    origUnlockedClasses
  ).reduce<KeyTrue>((obj, className) => {
    if (removedClasses.includes(className)) return obj

    return { ...obj, [className]: true }
  }, {})
  const newClassesFormatted = newClasses.reduce<KeyTrue>(
    (obj, className) => ({ ...obj, [className]: true }),
    {}
  )
  await ref.set({
    ...origClassesMinusRemoved,
    ...newClassesFormatted,
  })
}
