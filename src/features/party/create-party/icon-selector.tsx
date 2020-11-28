import { SetState } from 'types'
import { ComboOption } from './types'
import React, { useState } from 'react'
import * as icons from 'react-icons/gi'
import { EuiComboBox, EuiComboBoxOptionOption, EuiIcon } from '@elastic/eui'

type IconSelectorProps = {
  selectedIconOptions: ComboOption[] | undefined
  setSelectedIconOptions: SetState<ComboOption[] | undefined>
}
const IconSelector = ({
  selectedIconOptions,
  setSelectedIconOptions,
}: IconSelectorProps) => {
  const iconKeys = Object.keys(icons)
  // const [selectedOptions, setSelectedOptions] = useState<ComboOption[]>()

  // console.log(JSON.stringify(icons.GiTurtle))

  const options = getIconOptions(iconKeys)

  const onChange = (selectedOptions: ComboOption[]) => {
    // We should only get back either 0 or 1 options.
    setSelectedIconOptions(selectedOptions)
  }

  const renderOption = (
    option: ComboOption,
    searchValue: string,
    contentClassName: string
  ) => {
    const { label, value } = option
    return (
      <span className={contentClassName}>
        {/* @ts-ignore */}
        <EuiIcon type={icons[value]} style={{ marginRight: '0.7em' }} />
        {label}
      </span>
    )
  }

  return (
    <EuiComboBox
      placeholder="Select an icon for your party"
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={selectedIconOptions}
      onChange={onChange}
      renderOption={renderOption}
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
