import { ComboOption, PartyData, SetState } from 'types/types'
import React from 'react'
import { EuiComboBox, EuiIcon } from '@elastic/eui'
import * as icons from 'assets/icons/class-icons'
import styled from 'styled-components'

type ClassSelectProps = {
  party: PartyData
  selectedIconOptions: ComboOption[] | undefined
  setSelectedIconOptions: SetState<ComboOption[] | undefined>
  onChange?: (e: any) => void
  isInvalid?: boolean
}
const ClassSelect = ({
  party,
  selectedIconOptions,
  setSelectedIconOptions,
  isInvalid,
}: ClassSelectProps) => {
  const comboOptions: ComboOption[] = Object.keys(party.unlockedClasses).map(
    (className) => ({
      label: className,
      iconcolor: 'orange',
    })
  )

  const onBoxChange = (selectedOptions: ComboOption[]) => {
    setSelectedIconOptions(selectedOptions)
  }

  const renderOption = (
    option: ComboOption,
    searchValue: string,
    contentClassName: string
  ) => {
    const { label } = option
    return (
      <span className={contentClassName}>
        <EuiIcon
          //TODO: figure out typing here
          // @ts-ignore
          type={icons[label] ?? 'questionInCircle'}
          style={{ marginRight: '0.7em' }}
        />
        {label}
      </span>
    )
  }

  return (
    <>
      <ComboBoxWrapper>
        <EuiComboBox
          placeholder="Choose a class"
          singleSelection={{ asPlainText: true }}
          options={comboOptions}
          selectedOptions={selectedIconOptions}
          // onChange={(whatever) => console.log(whatever)}
          onChange={onBoxChange}
          prepend={
            <EuiIcon
              type={
                //TODO: figure out type
                //@ts-ignore
                icons[selectedIconOptions?.[0]?.label] ?? 'questionInCircle'
              }
            />
          }
          renderOption={renderOption}
          // isInvalid={isInvalid}
        />
      </ComboBoxWrapper>
    </>
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
