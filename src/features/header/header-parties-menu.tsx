import {
  htmlIdGenerator,
  EuiAvatar,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiSelectable,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
  ExclusiveUnion,
} from '@elastic/eui'
import {
  EuiSelectableGroupLabelOption,
  EuiSelectableLIOption,
} from '@elastic/eui/src/components/selectable/selectable_option'
import React, { useState } from 'react'

type HeaderPartiesMenuProps = {
  //
}
const HeaderPartiesMenu = ({}: HeaderPartiesMenuProps) => {
  const id = htmlIdGenerator()()
  const spacesValues = [
    {
      label: 'Sales team',
      prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
      checked: 'on',
    },
    {
      label: 'Engineering',
      prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
    },
    {
      label: 'Security',
      prepend: <EuiAvatar type="space" name="Security" size="s" />,
    },
    {
      label: 'Default',
      prepend: <EuiAvatar type="space" name="Default" size="s" />,
    },
  ]

  const additionalSpaces = [
    {
      label: 'Sales team 2',
      prepend: <EuiAvatar type="space" name="Sales Team 2" size="s" />,
    },
    {
      label: 'Engineering 2',
      prepend: <EuiAvatar type="space" name="Engineering 2" size="s" />,
    },
    {
      label: 'Security 2',
      prepend: <EuiAvatar type="space" name="Security 2" size="s" />,
    },
    {
      label: 'Default 2',
      prepend: <EuiAvatar type="space" name="Default 2" size="s" />,
    },
  ]

  const [spaces, setSpaces] = useState<any>(spacesValues)
  const [selectedSpace, setSelectedSpace] = useState(
    spaces.filter((option: any) => option.checked)[0]
  )
  const [isOpen, setIsOpen] = useState(false)

  const isListExtended = () => {
    return spaces.length > 4 ? true : false
  }

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const closePopover = () => {
    setIsOpen(false)
  }

  const onChange = (options: any) => {
    setSpaces(options)
    setSelectedSpace(options.filter((option: any) => option.checked)[0])
    setIsOpen(false)
  }

  const addMoreSpaces = () => {
    setSpaces(spaces.concat(additionalSpaces))
  }

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}
    >
      {selectedSpace.prepend}
    </EuiHeaderSectionItemButton>
  )

  return (
    <EuiPopover
      id={id}
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiSelectable
        searchable={isListExtended()}
        // searchProps={{
        //   placeholder: 'Find a space',
        //   compressed: true,
        // }}
        options={spaces}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 40,
          showIcons: false,
        }}
      >
        {(list, search) => (
          <>
            <EuiPopoverTitle paddingSize="s">
              {search || 'Your spaces'}
            </EuiPopoverTitle>
            {list}
            <EuiPopoverFooter paddingSize="s">
              <EuiButton
                size="s"
                fullWidth
                onClick={addMoreSpaces}
                disabled={isListExtended()}
              >
                Add more spaces
              </EuiButton>
            </EuiPopoverFooter>
          </>
        )}
      </EuiSelectable>
    </EuiPopover>
  )
}

export default HeaderPartiesMenu
