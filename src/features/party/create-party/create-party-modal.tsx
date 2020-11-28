import React, { Suspense, useState } from 'react'
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
  EuiIcon,
} from '@elastic/eui'
import { BoolSetState } from 'types'
import IconSelector from './icon-selector'
import { ComboOption } from './types'
import { GiBubbles } from 'react-icons/gi'

type CreatePartyModalProps = {
  setIsOpen: BoolSetState
}
const CreatePartyModal = ({ setIsOpen }: CreatePartyModalProps) => {
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
    if (!currentUser) return
    // console.log(currentUser?.uid)
    // return
    try {
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
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  // const getIcon = async () => {
  //   if (selectedIconOptions?.[0].value) {
  //     //@ts-ignore
  //     const icon = await import('react-icons/gi')[selectedIconOptions[0].value]
  //     return icon
  //   }
  // }

  // const SelectedIcon = React.lazy(() =>
  //   import('react-icons/gi').then((module) => {
  //     if (selectedIconOptions?.[0].value) {
  //       //@ts-ignore
  //       return { default: module[selectedIconOptions[0].value] }
  //     }

  //     return { default: module.GiBabyFace }
  //   })
  // )

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
