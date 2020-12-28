import { BoolSetState, ComboOption, PartyData } from 'types/types'
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
  EuiSelect,
  EuiCheckboxGroup,
} from '@elastic/eui'
import { GlobalToastContext } from 'features/global-toast'
import { useModalForm } from 'features/common/hooks/use-modal-form'
import { useHistory } from 'react-router-dom'
import ClassSelect from './class-select'

type CreateCharacterModalProps = {
  setIsOpen: BoolSetState
  party: PartyData
}
const CreateCharacterModal = ({
  setIsOpen,
  party,
}: CreateCharacterModalProps) => {
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
  } = useModalForm(['characterName', 'characterClass'])

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.currentTarget)
  }

  return (
    <EuiOverlayMask onClick={closeModal}>
      <EuiModal onClose={closeModal} initialFocus="[name=characterName]">
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
            <EuiFormRow
              label="Class"
              isInvalid={errs.characterClass.isErr}
              fullWidth
            >
              {/* <EuiFieldText
                name="characterClass"
                isInvalid={errs.characterClass.isErr}
                onChange={clearErr('characterClass')}
                fullWidth
              /> */}
              <ClassSelect
                party={party}
                selectedIconOptions={selectedIconOptions}
                setSelectedIconOptions={setSelectedIconOptions}
              />
            </EuiFormRow>
            <EuiFormRow
              // label="Add"
              // isInvalid={errs.characterClass.isErr}
              fullWidth
            >
              <EuiButton size="s" color="secondary">
                Add/unlock more classes
              </EuiButton>
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
