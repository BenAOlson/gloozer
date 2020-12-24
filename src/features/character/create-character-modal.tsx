import { BoolSetState } from 'types/types'
import React, { useContext, useState } from 'react'
// import { nanoid } from 'nanoid'
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
  EuiSelect,
  EuiCheckboxGroup,
} from '@elastic/eui'
import { GlobalToastContext } from 'features/global-toast'
import { useModalForm } from 'features/common/hooks/use-modal-form'
import { useHistory } from 'react-router-dom'

type CreateCharacterModalProps = {
  setIsOpen: BoolSetState
}
const CreateCharacterModal = ({ setIsOpen }: CreateCharacterModalProps) => {
  const history = useHistory()
  const addToast = useContext(GlobalToastContext)

  const {
    errs,
    setErrs,
    errMsgs,
    clearErr,
    isLoading,
    setIsLoading,
  } = useModalForm(['characterName'])

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.currentTarget)
  }

  return (
    <EuiOverlayMask onClick={closeModal}>
      <EuiModal onClose={closeModal} initialFocus="[name=partyName]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>New character</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm
            component="form"
            onSubmit={handleSubmit}
            error={errMsgs}
            isInvalid={!!errMsgs.length}
            id="scenario-form"
          >
            <EuiFormRow
              label="Character Name"
              isInvalid={errs.characterName.isErr}
              fullWidth
            >
              <EuiFieldText
                name="characterName"
                isInvalid={errs.characterName.isErr}
                onChange={clearErr('characterName')}
                fullWidth
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

          <EuiButton type="submit" form="party-form" isLoading={isLoading} fill>
            Create
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )
}

export default CreateCharacterModal
