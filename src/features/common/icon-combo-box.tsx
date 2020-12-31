import { EuiComboBox, EuiHighlight, EuiIconProps, IconType } from '@elastic/eui'
import React from 'react'
import { ComboOption, SetState } from 'types/types'
import { ClassIconProps } from './icons/class-icon'

type IconComboBoxProps = {
  selectedOptions: ComboOption[] | undefined
  setSelectedOptions: SetState<ComboOption[] | undefined>
  options: ComboOption[] | undefined
  Icon: React.ElementType<ClassIconProps> | React.ElementType<EuiIconProps>
  getIcon?: (key: string) => IconType
  isInvalid: boolean
  clearErr(): void
  placeholder: string
}

const IconComboBox = ({
  selectedOptions,
  setSelectedOptions,
  options,
  Icon,
  getIcon,
  isInvalid,
  clearErr,
  placeholder,
}: IconComboBoxProps) => {
  const onBoxChange = (selectedOptions: ComboOption[]) => {
    setSelectedOptions(selectedOptions)
    clearErr()
  }

  const renderOption = (
    option: ComboOption,
    searchValue: string,
    contentClassName: string
  ) => {
    const { label, value } = option
    return (
      <span className={contentClassName}>
        <Icon
          //TODO: figure this out
          //@ts-ignore
          type={getIcon && value ? getIcon(value) : value ?? 'empty'}
          style={{ marginRight: '0.7em' }}
        />
        <EuiHighlight search={searchValue}>{label}</EuiHighlight>
      </span>
    )
  }

  const selectedValue = selectedOptions?.[0]?.value

  return (
    <EuiComboBox
      placeholder={placeholder}
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={selectedOptions}
      onChange={onBoxChange}
      renderOption={renderOption}
      isInvalid={isInvalid}
      prepend={
        <Icon
          //TODO: figure this out
          //@ts-ignore
          type={
            getIcon && selectedValue
              ? getIcon(selectedValue)
              : selectedValue ?? 'empty'
          }
          style={{
            //TODO: remove when height bug fixed in EUI
            padding: '12px 8px',
          }}
        />
      }
    />
  )
}

export default IconComboBox
