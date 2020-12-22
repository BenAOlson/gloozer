import { BoolSetState } from 'types/types'
import { ComboOption } from './types'
import React, { useContext, useState } from 'react'
import { nanoid } from 'nanoid'
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
  EuiCheckbox,
} from '@elastic/eui'
import IconSelector from './icon-selector'
import { GlobalToastContext } from 'features/global-toast'
import { useModalForm } from 'features/common/hooks/use-modal-form'
import { useHistory } from 'react-router-dom'
import {
  Campaigns,
  campaignTypes,
  Expansions,
  expansionTypes,
} from '@constants'

/*
  TODO:
  ----
    * Add expansions to database on party creation
*/

type ExpansionState = {
  type: Expansions
  name: string
  campaign: Campaigns
  isChecked: boolean
}[]

type CreatePartyModalProps = {
  setIsOpen: BoolSetState
}
const CreatePartyModal = ({ setIsOpen }: CreatePartyModalProps) => {
  const history = useHistory()
  const addToast = useContext(GlobalToastContext)
  const [selectedIconOptions, setSelectedIconOptions] = useState<
    ComboOption[]
  >()
  const campaignOptions = Object.entries(campaignTypes).map((entry) => ({
    value: entry[0],
    text: entry[1].name,
  }))
  const [selectedCampaign, setSelectedCampaign] = useState(
    campaignOptions[0].value
  )
  const defaultExpansionState: ExpansionState = Object.entries(
    expansionTypes
  ).map(([key, value]) => ({
    type: key as Expansions,
    name: value.name,
    campaign: value.campgian,
    isChecked: false,
  }))
  const [expansions, setExpansions] = useState<ExpansionState>(
    defaultExpansionState
  )

  console.log('CreatePartyModal ~ expansions', expansions)

  const expansionOptions = expansions
    .filter((expansion) => expansion.campaign === selectedCampaign)
    .map((expansion) => ({
      id: expansion.type,
      name: expansion.type,
      label: expansion.name,
    }))

  const expansionsChecked = expansions.reduce(
    (obj, value) => ({ ...obj, [value.type]: value.isChecked }),
    {}
  )

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

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCampaign = e.currentTarget.value as
      | keyof typeof campaignTypes
      | undefined

    if (!selectedCampaign) return
    setSelectedCampaign(selectedCampaign)
  }

  const handleExpansionChange = (id: string) => {
    setExpansions((prevExpansions) => {
      const targetIndex = prevExpansions.findIndex(
        (expansion) => expansion.type === id
      )
      const unaffectedExpansions = [...prevExpansions]
      unaffectedExpansions.splice(targetIndex, 1)
      const updatedExpansion = {
        ...prevExpansions[targetIndex],
        isChecked: !prevExpansions[targetIndex].isChecked,
      }
      unaffectedExpansions.push(updatedExpansion)
      return unaffectedExpansions
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const displayName = e.currentTarget.partyName.value
    // const campaignType = e.currentTarget.campaignType.value
    if (!(displayName && selectedIconOptions && selectedCampaign)) {
      setErrs({
        partyName: {
          isErr: !displayName,
          msg: !displayName ? `Enter a party name` : '',
        },
        iconName: {
          isErr: !selectedIconOptions,
          msg: !selectedIconOptions ? `Choose a party icon (it's...fun)` : '',
        },
        //At the moment, this always has to have a value, but leave for convenience
        campaignType: {
          isErr: !selectedCampaign,
          msg: !selectedCampaign ? `Choose a campaign` : '',
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
        throw new Error('User is creating party while not logged in.')
      }

      const formattedExpansions = expansions.reduce((obj, value) => {
        if (!(value.isChecked && value.campaign === selectedCampaign)) {
          return obj
        }

        return { ...obj, [value.type]: true }
      }, {})
      console.log(
        'formattedExpansions ~ formattedExpansions',
        formattedExpansions
      )

      //Create party
      const partyRef = db.ref(`parties/${nanoid()}`)
      await partyRef.set({
        displayName,
        iconName: selectedIconOptions?.[0].value,
        campaignType: selectedCampaign,
        expansions: formattedExpansions,
        users: {
          [currentUser.uid]: {
            displayName: currentUser.displayName,
            photoUrl: currentUser.photoURL,
            isAdmin: true,
          },
        },
      })
      history.push(`/party/${partyRef.key}`)

      //Update user
      const userRef = db.ref(`users/${currentUser.uid}/parties/${partyRef.key}`)
      await userRef.set({
        displayName,
        campaignType: selectedCampaign,
        expansions: formattedExpansions,
        iconName: selectedIconOptions?.[0].value,
      })
      addToast({
        title: `Successfully created new party: ${displayName}`,
        color: 'success',
      })
      setIsOpen(false)
    } catch (err) {
      console.error(err)
      addToast({
        title: `Failed to create ${displayName} party`,
        color: 'danger',
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
            <EuiFormRow
              label="Campaign"
              isInvalid={errs.campaignType.isErr}
              fullWidth
            >
              <EuiSelect
                id="selectDocExample"
                name="campaignType"
                options={campaignOptions}
                isInvalid={errs.campaignType.isErr}
                // value={selectedCampaign}
                onChange={handleCampaignChange}
                aria-label="Use aria labels when no actual label is in use"
              />
            </EuiFormRow>
            {!!expansionOptions.length && (
              <EuiFormRow
                label="Expansions"
                isInvalid={errs.campaignType.isErr}
                fullWidth
              >
                <EuiCheckboxGroup
                  options={expansionOptions}
                  // options={checkboxes}
                  idToSelectedMap={expansionsChecked}
                  onChange={handleExpansionChange}
                />
              </EuiFormRow>
            )}
            {/* {expansionOptions.map((option) => (
              <EuiCheckbox
                name={option.name}
                label={option.label}
                id={option.id}
                onChange={(e) => console.log(e)}
              />
            ))} */}
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
