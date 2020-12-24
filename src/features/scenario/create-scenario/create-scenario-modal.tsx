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

type CreateScenarioModalProps = {
  setIsOpen: BoolSetState
}
const CreateScenarioModal = ({ setIsOpen }: CreateScenarioModalProps) => {
  const history = useHistory()
  const addToast = useContext(GlobalToastContext)

  const {
    errs,
    setErrs,
    errMsgs,
    clearErr,
    isLoading,
    setIsLoading,
  } = useModalForm(['partyName', 'iconName', 'campaignType'])

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
          <EuiModalHeaderTitle>New scenario</EuiModalHeaderTitle>
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
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

          <EuiButton type="submit" form="party-form" isLoading={isLoading} fill>
            Start scenario
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )
}

export default CreateScenarioModal
