import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { GlobalToastContext } from 'features/global-toast'
import { PartyData } from 'types/types'
import { EuiButton } from '@elastic/eui'

type DummyCharacterCardProps = {
  party: PartyData
}
const DummyCharacterCard = ({ party }: DummyCharacterCardProps) => {
  const addToast = useContext(GlobalToastContext)
  const [characters, setCharacters] = useState<any>()
  const [forceUpdate, setForceUpdate] = useState(true)
  console.log('DummyCharacterCard ~ characters', characters)

  useEffect(() => {
    const db = firebase.database()
    const ref = db.ref('characters')

    ref
      .orderByChild('party')
      .equalTo(party.uid)
      // .equalTo('BBviZVqhOz9AaVOaycSGO')
      .on(
        'value',
        (snapshot) => {
          console.log('useEffect ~ snapshot', snapshot)
          setCharacters(snapshot.val())
        },
        (err: Error) => {
          console.error(err)
          setCharacters(undefined)
          addToast({
            title: err.name,
            text: err.message,
            color: 'danger',
          })
        }
      )

    return () => {
      ref.off()
    }
  }, [forceUpdate])

  return (
    <div>
      <EuiButton onClick={() => setForceUpdate((prevValue) => !prevValue)}>
        retry reading
      </EuiButton>
    </div>
  )
}

export default DummyCharacterCard
