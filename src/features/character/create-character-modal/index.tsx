import { BoolSetState, Character, ComboOption, PartyData } from 'types/types'
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
  EuiRange,
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiPopover,
  EuiHeader,
  BREAKPOINTS,
} from '@elastic/eui'
import { GlobalToastContext } from 'features/global-toast'
import { useModalForm } from 'features/common/hooks/use-modal-form'
import ClassSelect from './class-select'
import ClassUnlockCards from 'features/class-unlock/class-unlock-cards'
import ClassUnlockModal from 'features/class-unlock/class-unlock-modal'

type CreateCharacterModalProps = {
  setIsOpen: BoolSetState
  party: PartyData
}
const CreateCharacterModal = ({
  setIsOpen,
  party,
}: CreateCharacterModalProps) => {
  const addToast = useContext(GlobalToastContext)
  const [isClassUnlockOpen, setIsClassUnlockOpen] = useState(true)
  const [selectedIconOptions, setSelectedIconOptions] = useState<
    ComboOption[]
  >()
  const [characterLevel, setCharacterLevel] = useState('1')

  const {
    errs,
    setErrs,
    errMsgs,
    clearErr,
    isLoading,
    setIsLoading,
  } = useModalForm(['characterName', 'characterClass', 'characterLevel'])

  const closeModal = () => {
    setIsOpen(false)
  }

  const onLevelChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCharacterLevel(e.currentTarget.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const displayName = e.currentTarget.characterName.value
    const classType = selectedIconOptions?.[0]?.label
    if (!(displayName && classType)) {
      setErrs({
        characterName: {
          isErr: !displayName,
          msg: !displayName ? 'Name your character' : '',
        },
        characterClass: {
          isErr: !classType,
          msg: !classType ? 'Choose a class' : '',
        },
        characterLevel: {
          isErr: false,
          msg: '',
          // isErr: !selectedIconOptions?.length,
          // msg: !selectedIconOptions?.length ? 'Choose a class' : '',
        },
      })
      return
    }
    setIsLoading(true)
    const db = firebase.database()
    const currentUser = firebase.auth().currentUser
    try {
      if (!currentUser) {
        //This shouldn't happen...but I'm the one building this, so who knows
        throw new Error('User is creating a character while not logged in')
      }
      const level = parseInt(characterLevel)
      const newCharacter: Character = {
        displayName,
        classType,
        level,
        gold: 15 * (1 + level),
        //This is the forumula for XP/level...someone else used calculus to get this
        xp: 2.5 * level ** 2 + 37.5 * level - 40,
        party: party.uid,
      }
      await db.ref(`characters`).push(newCharacter)
      addToast({
        title: `Successfully created new character: ${displayName}`,
        color: 'success',
      })
      setIsOpen(false)
      return
    } catch (err) {
      addToast({
        title: `Failed to create ${displayName}`,
        color: 'danger',
      })
    }
    setIsLoading(false)
  }

  return (
    <>
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
                aria-required
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
                labelAppend={
                  <EuiText size="xs">
                    <EuiLink
                      onClick={() => setIsClassUnlockOpen((isOpen) => !isOpen)}
                    >
                      Add/unlock more classes
                    </EuiLink>
                  </EuiText>
                }
                isInvalid={errs.characterClass.isErr}
                fullWidth
                aria-required
              >
                <>
                  <ClassSelect
                    party={party}
                    selectedIconOptions={selectedIconOptions}
                    setSelectedIconOptions={setSelectedIconOptions}
                    isInvalid={errs.characterClass.isErr}
                    clearErr={clearErr('characterClass')}
                  />
                  {/* <EuiSpacer size="xs" />
                <EuiButton size="s" color="secondary" fullWidth>
                  Add/unlock more classes
                </EuiButton> */}
                </>
              </EuiFormRow>
              {/* <EuiFormRow
              // label="Add"
              // isInvalid={errs.characterClass.isErr}
              fullWidth
            >
              <EuiButton size="s" color="secondary">
                Add/unlock more classes
              </EuiButton>
            </EuiFormRow> */}
              <EuiFormRow
                label="Starting level"
                // isInvalid={errs.characterClass.isErr}
                fullWidth
              >
                <EuiRange
                  min={1}
                  max={9}
                  value={characterLevel}
                  onChange={onLevelChange}
                  showInput
                  showTicks
                  fullWidth
                />
              </EuiFormRow>
            </EuiForm>
            {/* {isClassUnlockOpen && <ClassUnlock party={party} />} */}
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

            <EuiButton
              type="submit"
              form="scenario-form"
              isLoading={isLoading}
              fill
            >
              Create
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
      {isClassUnlockOpen && (
        <ClassUnlockModal
          party={party}
          setIsClassUnlockOpen={setIsClassUnlockOpen}
        />
      )}
    </>
  )
}

export default CreateCharacterModal
