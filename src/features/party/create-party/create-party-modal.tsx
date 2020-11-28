import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import {
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiButton,
  htmlIdGenerator,
} from '@elastic/eui'
import { BoolSetState } from 'types'
import IconSelector from './icon-selector'
import { ComboOption } from './types'
import { GlobalToastContext } from 'features/global-toast'

type CreatePartyModalProps = {
  setIsOpen: BoolSetState
}
const CreatePartyModal = ({ setIsOpen }: CreatePartyModalProps) => {
  const addToast = useContext(GlobalToastContext)
  const [selectedIconOptions, setSelectedIconOptions] = useState<
    ComboOption[]
  >()
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const createParty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const displayName = e.currentTarget.partyName.value
    const db = firebase.database()
    const currentUser = firebase.auth().currentUser
    try {
      if (!currentUser) {
        //This shouldn't happen...but I'm the one building this, so who knows
        throw new Error('User is creating party while not logged in.')
      }
      const partyRef = await db.ref('parties').push()
      await partyRef.set({
        displayName,
        iconName: selectedIconOptions?.[0].value,
        users: {
          [currentUser.uid]: {
            displayName: currentUser.displayName,
            photoUrl: currentUser.photoURL,
          },
        },
      })
      const userRef = db.ref(`users/${currentUser.uid}/parties/${partyRef.key}`)
      await userRef.set({
        displayName,
        iconName: selectedIconOptions?.[0].value,
      })
      setIsOpen(false)
      addToast({
        title: `Successfully created ${displayName}`,
        color: 'success',
        id: htmlIdGenerator()(),
      })
    } catch (err) {
      console.error(err)
      addToast({
        title: `Failed to create ${displayName} party`,
        color: 'danger',
        id: htmlIdGenerator()(),
      })
    }
    setIsLoading(false)
  }

  return (
    <EuiOverlayMask onClick={closeModal}>
      <EuiModal onClose={closeModal} initialFocus="[name=partyName]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Create party</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          {/* {selectedIconOptions?.[0].value && <EuiIcon type={getIcon()} />} */}
          {/* <Suspense fallback={<div>loading...</div>}>
            <SelectedIcon />
          </Suspense> */}
          <EuiForm
            component="form"
            onSubmit={createParty}
            // error={errorMsgs}
            // isInvalid={!!errorMsgs.length}
            id="party-form"
          >
            <EuiFormRow label="Party name" fullWidth>
              <EuiFieldText
                name="partyName"
                fullWidth
                // isInvalid={errors.email.isError}
              />
            </EuiFormRow>
            <EuiFormRow label="Icon" fullWidth>
              <IconSelector
                selectedIconOptions={selectedIconOptions}
                setSelectedIconOptions={setSelectedIconOptions}
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

          <EuiButton type="submit" form="party-form" isLoading={isLoading} fill>
            Create party
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )
}

export default CreatePartyModal
