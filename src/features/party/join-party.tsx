import { EuiEmptyPrompt, EuiButton, htmlIdGenerator } from '@elastic/eui'
import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import CreatePartyModal from './create-party/create-party-modal'
import * as icons from 'react-icons/gi'
import { User } from 'types'
import { GlobalToastContext } from 'features/global-toast'

type JoinPartyProps = {
  displayName: string
  iconName: string
  userNames: string[]
  partyId: string
  user: User
}
const JoinParty = ({
  displayName,
  iconName,
  userNames,
  partyId,
  user,
}: JoinPartyProps) => {
  const addToast = useContext(GlobalToastContext)
  const [isJoinButtonLoading, setIsJoining] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onJoinPartyClick = async () => {
    setIsJoining(true)
    const ref = firebase.database().ref(`parties/${partyId}/users/${user.uid}`)
    try {
      await ref.set({ displayName: user.displayName })
      addToast({
        title: `Joined ${displayName} party`,
        color: 'success',
        id: htmlIdGenerator()(),
      })
    } catch (err: unknown) {
      const msg = (err as Error).message
      console.error(msg)
      addToast({
        title: `Failed to join ${displayName} party`,
        color: 'danger',
        id: htmlIdGenerator()(),
      })
    }
    setIsJoining(false)
  }

  return (
    <>
      <EuiEmptyPrompt
        //@ts-ignore
        iconType={icons[iconName]}
        title={<h2>{displayName}</h2>}
        body={
          <>
            <p>
              You aren't a member of this party yet, but your friend
              {userNames.length > 1 && 's'} {getFormattedUserNames(userNames)}{' '}
              {userNames.length > 1 ? 'have' : 'has'} already joined this party,
              and I'm sure they'd be happy to have you.
            </p>
            <p>
              Or you can create a new party. Or you can slowly walk out into the
              ocean. I really don't care what you do.
            </p>
          </>
        }
        actions={[
          <EuiButton
            color="primary"
            fill
            onClick={onJoinPartyClick}
            isLoading={isJoinButtonLoading}
          >
            Join party
          </EuiButton>,
          <EuiButton color="primary" onClick={() => setIsModalOpen(true)}>
            Create new party
          </EuiButton>,
        ]}
      />
      {isModalOpen && <CreatePartyModal setIsOpen={setIsModalOpen} />}
    </>
  )
}

export default JoinParty

const getFormattedUserNames = (userNames: string[]) => {
  if (userNames.length === 1) return userNames.join(',')
  const newNames = [...userNames]
  const lastName = newNames.pop()
  const nameStr = newNames.join(', ')
  return `${nameStr} and ${lastName}`
}
