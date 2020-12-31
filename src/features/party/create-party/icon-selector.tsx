import { SetState, ComboOption } from 'types/types'
import React from 'react'
import * as icons from 'react-icons/gi'
import { EuiIcon } from '@elastic/eui'
import IconComboBox from 'features/common/icon-combo-box'

//!-----------
//! Deprecated
//!-----------

type IconSelectorProps = {
  selectedIconOptions: ComboOption[] | undefined
  setSelectedIconOptions: SetState<ComboOption[] | undefined>
  clearErr(): void
  isInvalid: boolean
}
const IconSelector = ({
  selectedIconOptions,
  setSelectedIconOptions,
  clearErr,
  isInvalid,
}: IconSelectorProps) => {
  const iconKeys = Object.keys(icons)

  const options = getIconOptions(iconKeys)

  return (
    <IconComboBox
      selectedOptions={selectedIconOptions}
      setSelectedOptions={setSelectedIconOptions}
      options={options}
      Icon={EuiIcon}
      getIcon={(key) => (icons as any)?.[key]}
      isInvalid={isInvalid}
      clearErr={clearErr}
      placeholder="Select an icon for your party"
    />
  )
}

export default IconSelector

const getIconOptions = (iconKeys: string[]): ComboOption[] => {
  const options: ComboOption[] = iconKeys.sort().map((key) => ({
    label: key
      .replace(/^Gi/, '')
      .replace(/((?<!3)[A-Z])/g, ' $1')
      .trim(),
    value: key,
  }))
  return options
}
