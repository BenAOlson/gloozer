import { ComboOption, PartyData, SetState } from 'types/types'
import React from 'react'
import { EuiComboBox, EuiHighlight, EuiIcon } from '@elastic/eui'
import * as icons from 'assets/icons/class-icons'
import playerClasses from 'data/classes'
import { setTypes } from 'project-constants'

type ClassSelectProps = {
  party: PartyData
  selectedIconOptions: ComboOption[] | undefined
  setSelectedIconOptions: SetState<ComboOption[] | undefined>
  isInvalid: boolean
  clearErr: () => void
}
const ClassSelect = ({
  party,
  selectedIconOptions,
  setSelectedIconOptions,
  isInvalid,
  clearErr,
}: ClassSelectProps) => {
  const onBoxChange = (selectedOptions: ComboOption[]) => {
    setSelectedIconOptions(selectedOptions)
    clearErr()
  }

  console.log('class select rendered')

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
          type={icons[label] ?? 'empty'}
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

  return (
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
            icons[selectedIconOptions?.[0]?.label] ?? 'empty'
          }
          //TODO: remove when height bug fixed in EUI
          style={{
            padding: '12px 8px',
            //style prop overrides style applied by color prop below
            color: selectedIconOptions?.[0]?.color,
          }}
          //TODO: return after style prop is removed
          // color={selectedIconOptions?.[0]?.color}
        />
      }
      renderOption={renderOption}
      isInvalid={isInvalid}
      fullWidth
    />
  )
}

export default ClassSelect
