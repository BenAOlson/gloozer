import { PartyData, SetState } from 'types/types'
import React, { useContext, useState } from 'react'
import {
  EuiOverlayMask,
  EuiModal,
  BREAKPOINTS,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
  EuiButtonEmpty,
  EuiConfirmModal,
  EuiText,
  EuiSpacer,
} from '@elastic/eui'
import ClassUnlockCards from './class-unlock-cards'
import styled from '@emotion/styled'
import { GlobalToastContext } from 'features/global-toast'
import { updateUnlockedClasses } from './firebase'
import ClassIcon from 'features/common/icons/class-icon'

type ClassUnlockModalProps = {
  party: PartyData
  setIsClassUnlockOpen: SetState<boolean>
}
const ClassUnlockModal = ({
  party,
  setIsClassUnlockOpen,
}: ClassUnlockModalProps) => {
  const addToast = useContext(GlobalToastContext)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const startingClasses = Object.keys(party.unlockedClasses)
  const [selectedClasses, setSelectedClasses] = useState(startingClasses)

  const handleConfirm = async () => {
    setIsConfirmModalOpen(false)
    setIsLoading(true)
    try {
      await updateUnlockedClasses(newClasses, removedClasses, party)
      addToast({
        title: `Party classes updated`,
        color: 'success',
      })
      setIsClassUnlockOpen(false)
    } catch (err) {
      console.error(err)
      addToast({
        title: 'Error updating classes',
        text: (err as Error).message,
        color: 'danger',
      })
    }
    setIsLoading(false)
  }

  const handleUpdateClick = () => {
    setIsConfirmModalOpen(true)
  }

  const newClasses = selectedClasses.filter(
    (className) => !startingClasses.includes(className)
  )
  const removedClasses = startingClasses.filter(
    (className) => !selectedClasses.includes(className)
  )
  const totalUpdated = newClasses.length + removedClasses.length
  const isUpdateDisabled = !totalUpdated
  const confirmAction =
    newClasses.length && removedClasses.length
      ? 'Update'
      : newClasses.length
      ? 'Add'
      : 'Remove'
  const classPluralEnding = totalUpdated === 1 ? '' : 'es' //Ugh...whatever
  const confirmTitle = `${confirmAction} ${totalUpdated} class${classPluralEnding}?`

  return (
    <>
      <EuiOverlayMask>
        <EuiModal
          maxWidth={BREAKPOINTS.xl}
          onClose={() => setIsClassUnlockOpen(false)}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>Add/remove classes</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <ClassUnlockCards
              party={party}
              selectedClasses={selectedClasses}
              setSelectedClasses={setSelectedClasses}
            />
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={() => setIsClassUnlockOpen(false)}>
              Cancel
            </EuiButtonEmpty>

            <EuiButton
              isLoading={isLoading}
              isDisabled={isUpdateDisabled}
              fill
              onClick={handleUpdateClick}
            >
              {isUpdateDisabled
                ? 'Nothing changed'
                : `${confirmAction} Class${classPluralEnding}`}
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
      {isConfirmModalOpen && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={confirmTitle}
            onCancel={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirm}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton="confirm"
          >
            {!!newClasses.length && (
              <>
                {!!removedClasses.length && (
                  <EuiText>
                    <h4>Classes added</h4>
                  </EuiText>
                )}
                <EuiSpacer size="s" />
                <IconGrid>
                  {newClasses.map((newClass, i) => (
                    <ClassIcon key={newClass} size="xxl" type={newClass} />
                  ))}
                </IconGrid>
              </>
            )}
            {!!(newClasses.length && removedClasses.length) && <EuiSpacer />}
            {!!removedClasses.length && (
              <>
                {!!newClasses.length && (
                  <EuiText>
                    <h4>Classes removed</h4>
                  </EuiText>
                )}
                <EuiSpacer size="s" />
                <IconGrid>
                  {removedClasses.map((removedClass, i) => (
                    <ClassIcon
                      key={removedClass}
                      size="xxl"
                      type={removedClass}
                    />
                  ))}
                </IconGrid>
              </>
            )}
          </EuiConfirmModal>
        </EuiOverlayMask>
      )}
    </>
  )
}

export default ClassUnlockModal

const IconGrid = styled.div`
  display: grid;
  //TODO: use theme value for this
  grid-gap: 0.8em;
  //TODO: use theme value for min (based on icon size XXL)
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
`
