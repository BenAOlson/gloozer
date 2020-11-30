import React, { useContext, useEffect, useState } from 'react'
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
import { useHistory, useRouteMatch } from 'react-router-dom'
import CreatePartyModal from 'features/party/create-party/create-party-modal'
import { UserContext } from 'features/firebase/user-context'

type SelectableOption = {
  label: string
  value: string
  prepend?: React.ReactNode
  checked?: string | null
}
const HeaderPartiesMenu = () => {
  //TODO: type this correctly
  const match = useRouteMatch<any>('/party/:partyId')
  const history = useHistory()
  const partyId = match?.params.partyId
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parties, setParties] = useState<SelectableOption[]>([])
  const id = htmlIdGenerator()()
  const user = useContext(UserContext)

  useEffect(() => {
    const db = firebase.database()
    const ref = db.ref(`users/${user?.uid}/parties`)
    ref.on('value', (snapshot) => {
      const partiesVal: any = snapshot.val()
      if (!partiesVal) return
      const partyOptions: SelectableOption[] = Object.keys(partiesVal).map(
        (partyKey, i) => {
          const { displayName, iconName } = partiesVal[partyKey]
          return {
            label: displayName,
            value: partyKey,
            prepend: <PartyIcon iconName={iconName} />,
            checked: partyId === partyKey ? 'on' : null, //conditionally set for active party
          }
        }
      )
      setParties(partyOptions ?? [])
    })
    return () => {
      ref.off()
      setParties([])
    }
  }, [user, partyId])

  const isListExtended = () => {
    return parties.length > 6
  }

  const onMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const onCreatyParyClick = () => {
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  const closePopover = () => {
    setIsMenuOpen(false)
  }

  const onChange = (options: SelectableOption[]) => {
    const selectedParty = options.filter((option) => option.checked)[0]
    // setParties(options)
    history.push(`/party/${selectedParty.value}`)
    setIsMenuOpen(false)
  }

  const selectedParty = parties.filter((option: any) => option.checked)[0]
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isMenuOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}
    >
      {selectedParty?.prepend ?? <EuiIcon type="apps" />}
    </EuiHeaderSectionItemButton>
  )

  return (
    <>
      <EuiPopover
        id={id}
        ownFocus
        button={button}
        isOpen={isMenuOpen}
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
                <EuiButton size="s" fullWidth onClick={onCreatyParyClick}>
                  Create new party
                </EuiButton>
              </EuiPopoverFooter>
            </>
          )}
        </EuiSelectable>
      </EuiPopover>
      {isModalOpen && <CreatePartyModal setIsOpen={setIsModalOpen} />}
    </>
  )
}

export default HeaderPartiesMenu
