import React, { Suspense, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useParams } from 'react-router-dom'
import { Party, User } from 'types'
import {
  EuiButton,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiLoadingSpinner,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from '@elastic/eui'
import PartyIcon from './party-icon'
import { ImConfused } from 'react-icons/im'
import CreatePartyModal from './create-party/create-party-modal'

/*
    TODO:
    ---
      * This needs a massive re-factor
        * Can check if the party is in the user first before doing other stuff
        * Still need to check if party exists, but don't need to waste another check on if user has joined
        * Get rid of callback hell
        * Probably split most of this up
 */

type UnjoinedParty =
  | {
      displayName: string
      iconName: string
      userNames: string[]
    }
  | null
  | false
type PartyDashProps = {
  user: User
}
const PartyDash = ({ user }: PartyDashProps) => {
  const { partyId } = useParams<{ partyId: string }>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [party, setParty] = useState<Party | null>(null)
  //null if the user is in the party, false if the 'unjoined' party doesn't exist
  const [unjoinedParty, setUnjoinedParty] = useState<UnjoinedParty>(null)

  useEffect(() => {
    const db = firebase.database()
    const refStr = `parties/${partyId}`
    const ref = db.ref(refStr)
    ref.on(
      'value',
      (snapshot) => {
        setParty(snapshot.val())
      },
      (err: Error) => {
        console.warn(err.message)
        const partyDisplayNameRef = db.ref(refStr + '/displayName')
        partyDisplayNameRef.get().then((displayNameSnapshot) => {
          if (displayNameSnapshot.exists()) {
            //Set the unjoined party data to pass to component
            const partyIconNameRef = db.ref(refStr + '/iconName')
            partyIconNameRef.get().then((iconNameSnapshot) => {
              const usersRef = db.ref(refStr + '/users')
              usersRef.get().then((usersSnapshot) => {
                const snapshotVal = usersSnapshot.val()
                const userNames = snapshotVal
                  ? Object.keys(snapshotVal).map(
                      (key) => snapshotVal[key].displayName
                    )
                  : []
                setUnjoinedParty({
                  displayName: displayNameSnapshot.val(),
                  iconName: iconNameSnapshot.val(),
                  userNames,
                })
              })
            })
          } else {
            setUnjoinedParty(false)
          }
        })
      }
    )

    return () => {
      ref.off()
      setUnjoinedParty(null)
      setParty(null)
    }
  }, [partyId, user])

  if (unjoinedParty === false) {
    return (
      <>
        <EuiPageBody>
          <EuiEmptyPrompt
            iconType={ImConfused}
            title={<h2>Party not found</h2>}
            body={
              <p>
                Double check the link, or just make a new party. You can never
                have too many parties.
              </p>
            }
            actions={
              <EuiButton
                color="primary"
                onClick={() => setIsCreateModalOpen(true)}
                fill
              >
                Create new party
              </EuiButton>
            }
          />
        </EuiPageBody>
        {isCreateModalOpen && (
          <CreatePartyModal setIsOpen={setIsCreateModalOpen} />
        )}
      </>
    )
  }

  if (party) {
    return (
      <EuiPageBody>
        <EuiPageContent horizontalPosition="center">
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>{party.displayName}</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiFlexGroup justifyContent="center">
              <PartyIcon iconName={party.iconName} size="xxl" />
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    )
  }

  const LoadingSpinner = (
    <div style={{ textAlign: 'center' }}>
      <EuiLoadingSpinner size="xl" />
    </div>
  )
  if (unjoinedParty) {
    const JoinParty = React.lazy(() => import('./join-party'))
    return (
      <EuiPageBody>
        <Suspense fallback={LoadingSpinner}>
          <JoinParty {...unjoinedParty} partyId={partyId} user={user} />
        </Suspense>
      </EuiPageBody>
    )
  }

  return <EuiPageBody>{LoadingSpinner}</EuiPageBody>
}

export default PartyDash
