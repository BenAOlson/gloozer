import {
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiButton,
  EuiButtonEmpty,
  EuiModalFooter,
} from '@elastic/eui'
import React, { useState } from 'react'
import { SetState } from 'types/types'

//TODO: Maybe make this. Maybe.

type ClearErr<K extends string> = (
  key: K
) => (e?: React.ChangeEvent<unknown>) => void
type Errs<K extends string> = Record<K, { isErr: boolean; msg: string }>
type UseModalForm<K extends string> = {
  errs: Errs<K>
  setErrs: SetState<Errs<K>>
  errMsgs: string[]
  clearErr: ClearErr<K>
  isLoading: boolean
  setIsLoading: SetState<boolean>
}
type FormModalProps = {
  isOpen: boolean
  setIsOpen: SetState<boolean>
  title: React.ReactNode
  formId: string
  submitButtonText: string
  children: React.ReactNode
  initialFocus?: string
}
const FormModal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  initialFocus,
}: FormModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <EuiOverlayMask onClick={closeModal}>
      <EuiModal
        onClose={closeModal}
        initialFocus={initialFocus && `[name=${initialFocus}]`}
      >
        <EuiModalHeader>
          <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>{children}</EuiModalBody>
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

export default FormModal
