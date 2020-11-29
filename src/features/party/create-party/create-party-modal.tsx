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
import { useModalForm } from 'features/common/hooks/use-modal-form'
import { useHistory } from 'react-router-dom'

type CreatePartyModalProps = {
  setIsOpen: BoolSetState
}
const CreatePartyModal = ({ setIsOpen }: CreatePartyModalProps) => {
  const history = useHistory()
  const addToast = useContext(GlobalToastContext)
  const [selectedIconOptions, setSelectedIconOptions] = useState<
    ComboOption[]
  >()
  const {
    errs,
    setErrs,
    errMsgs,
    clearErr,
    isLoading,
    setIsLoading,
  } = useModalForm(['partyName', 'iconName', 'general'])
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const partyName = e.currentTarget.partyName.value
    if (!(partyName && selectedIconOptions)) {
      console.log('whoops!')
      setErrs((errs) => ({
        ...errs,
        partyName: {
          isErr: !partyName,
          msg: !partyName ? `Enter a party name` : '',
        },
        iconName: {
          isErr: !selectedIconOptions,
          msg: !selectedIconOptions ? `Choose a party icon (it's...fun)` : '',
        },
      }))
      return
    }
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
      addToast({
        title: `Successfully created ${displayName}`,
        color: 'success',
        id: htmlIdGenerator()(),
      })
      history.push(`/party/${partyRef.key}`)
      setIsOpen(false)
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
          <EuiForm
            component="form"
            onSubmit={handleSubmit}
            error={errMsgs}
            isInvalid={!!errMsgs.length}
            id="party-form"
          >
            <EuiFormRow
              label="Party name"
              isInvalid={errs.partyName.isErr}
              fullWidth
            >
              <EuiFieldText
                name="partyName"
                isInvalid={errs.partyName.isErr}
                onChange={clearErr('partyName')}
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Icon" isInvalid={errs.iconName.isErr} fullWidth>
              <IconSelector
                selectedIconOptions={selectedIconOptions}
                setSelectedIconOptions={setSelectedIconOptions}
                onChange={clearErr('iconName')}
                isInvalid={errs.iconName.isErr}
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
