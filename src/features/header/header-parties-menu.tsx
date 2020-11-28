import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import {
  htmlIdGenerator,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiSelectable,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
  EuiIcon,
} from '@elastic/eui'
import PartyIcon from 'features/party/party-icon'

type SelectableOption = {
  label: string
  prepend?: React.ReactNode
  checked?: string | null
}
const HeaderPartiesMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [parties, setParties] = useState<SelectableOption[]>([])
  const id = htmlIdGenerator()()
  const user = firebase.auth().currentUser

  useEffect(() => {
    const db = firebase.database()
    const ref = db.ref(`users/${user?.uid}/parties`)
    ref.on('value', (snapshot) => {
      const partiesVal = snapshot.val()
      const partyOptions = Object.keys(partiesVal).map((key, i) => {
        const { displayName, iconName } = partiesVal[key]
        return {
          label: displayName,
          // prepend: <EuiAvatar type="space" name={displayName} size="s" />,
          prepend: <PartyIcon iconName={iconName} />,
          //TODO: set checked state for 'active' party for user
          checked: i === 0 ? 'on' : null, //conditionally set for active party
        }
      })
      setParties(partyOptions ?? [])
    })
    return () => {
      ref.off()
      setParties([])
    }
  }, [user])

  const isListExtended = () => {
    return parties.length > 6
  }

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const closePopover = () => {
    setIsOpen(false)
  }

  const onChange = (options: any) => {
    setParties(options)
    setIsOpen(false)
  }

  const selectedParty = parties.filter((option: any) => option.checked)[0]
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}
    >
      {selectedParty?.prepend ?? <EuiIcon type="questionInCircle" />}
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
        searchable={isListExtended() as true}
        searchProps={{
          placeholder: 'Find a party',
          compressed: true,
        }}
        options={parties as any}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 48,
          showIcons: false,
        }}
      >
        {(list, search) => (
          <>
            <EuiPopoverTitle paddingSize="s">
              {search || 'Your parties'}
            </EuiPopoverTitle>
            {list}
            <EuiPopoverFooter paddingSize="s">
              {/* This is a footer. */}
              <EuiButton size="s" fullWidth disabled={isListExtended()}>
                Create new party
              </EuiButton>
            </EuiPopoverFooter>
          </>
        )}
      </EuiSelectable>
    </EuiPopover>
  )
}

export default HeaderPartiesMenu

// const spacesValues = [
//   {
//     label: 'Sales team',
//     prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
//     checked: 'on',
//   },
//   {
//     label: 'Engineering',
//     prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
//   },
//   {
//     label: 'Security',
//     prepend: <EuiAvatar type="space" name="Security" size="s" />,
//   },
//   {
//     label: 'Default',
//     prepend: <EuiAvatar type="space" name="Default" size="s" />,
//   },
// ]

// const additionalSpaces = [
//   {
//     label: 'Sales team 2',
//     prepend: <EuiAvatar type="space" name="Sales Team 2" size="s" />,
//   },
//   {
//     label: 'Engineering 2',
//     prepend: <EuiAvatar type="space" name="Engineering 2" size="s" />,
//   },
//   {
//     label: 'Security 2',
//     prepend: <EuiAvatar type="space" name="Security 2" size="s" />,
//   },
//   {
//     label: 'Default 2',
//     prepend: <EuiAvatar type="space" name="Default 2" size="s" />,
//   },
// ]
