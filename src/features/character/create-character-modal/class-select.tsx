import { ComboOption, PartyData, SetState } from 'types/types'
import React from 'react'
import styled from 'styled-components'
import { EuiComboBox, EuiHighlight, EuiIcon } from '@elastic/eui'
import * as icons from 'assets/icons/class-icons'
import playerClasses from 'data/classes'
import { setTypes } from 'project-constants'

type ClassSelectProps = {
  party: PartyData
  selectedIconOptions: ComboOption[] | undefined
  setSelectedIconOptions: SetState<ComboOption[] | undefined>
  isInvalid?: boolean
}
const ClassSelect = ({
  party,
  selectedIconOptions,
  setSelectedIconOptions,
  isInvalid,
}: ClassSelectProps) => {
  const onBoxChange = (selectedOptions: ComboOption[]) => {
    setSelectedIconOptions(selectedOptions)
  }

  const renderOption = (
    option: ComboOption,
    searchValue: string,
    contentClassName: string
  ) => {
    const { label, color } = option
    return (
      <span className={contentClassName}>
        <EuiIcon
          //TODO: figure out typing here
          // @ts-ignore
          type={icons[label] ?? 'questionInCircle'}
          //using the color prop doesn't work for whatever reason
          style={{ marginRight: '0.7em', color }}
        />
        <EuiHighlight search={searchValue}>{label}</EuiHighlight>
      </span>
    )
  }

  // group combo box options by set name (e.g. 'Gloomhaven', 'Forgotten Circles')
  type GroupedOption = {
    label: string
    options: Array<ComboOption>
  }
  const groupedOptions = playerClasses.reduce<GroupedOption[]>(
    (acc, playerClass) => {
      const isUnlocked = Object.keys(party.unlockedClasses).includes(
        playerClass.name
      )
      if (!isUnlocked) return acc

      const gamesetName = setTypes[playerClass.set].name
      const gamesetOptionIndex = acc.findIndex(
        (option) => option.label === gamesetName
      )
      const playerClassOption = {
        label: playerClass.name,
        color: playerClass.color,
      }
      if (gamesetOptionIndex < 0) {
        acc.push({
          label: gamesetName,
          options: [playerClassOption],
        })
        return acc
      }

      acc[gamesetOptionIndex].options.push(playerClassOption)
      return acc
    },
    []
  )

  const selectedLabel = selectedIconOptions?.[0]?.label

  return (
    <ComboBoxWrapper>
      <EuiComboBox
        placeholder="Choose a class"
        singleSelection={{ asPlainText: true }}
        options={groupedOptions}
        selectedOptions={selectedIconOptions}
        onChange={onBoxChange}
        prepend={
          <EuiIcon
            type={
              //TODO: figure out type
              //@ts-ignore
              icons[selectedIconOptions?.[0]?.label] ?? 'questionInCircle'
            }
            color={selectedLabel ? selectedIconOptions?.[0]?.color : 'primary'}
          />
        }
        renderOption={renderOption}
        isInvalid={isInvalid}
      />
    </ComboBoxWrapper>
  )
}

export default ClassSelect

//TODO: remove when height bug fixed in EUI
//? using styled(EuiComboBox) was making typescript unhappy, and this
//? is needed to fix bug with icons
const ComboBoxWrapper = styled.div`
  .euiFormControlLayout {
    height: 40px;
  }
`
