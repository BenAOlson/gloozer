import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import {
  htmlIdGenerator,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiLink,
} from '@elastic/eui'
import { UserContext } from 'features/firebase/user-context'

const HeaderUserMenu = () => {
  const user = useContext(UserContext)
  const id = htmlIdGenerator()()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return null
  }

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const signOut = async () => {
    await firebase.auth().signOut()
    setIsOpen(false)
  }

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar
        name={user.displayName ?? 'No Name'}
        imageUrl={user.photoURL ?? undefined}
        size="s"
      />
    </EuiHeaderSectionItemButton>
  )

  return (
    <EuiPopover
      id={id}
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar
              name={user.displayName ?? 'No Name'}
              imageUrl={user.photoURL ?? undefined}
              size="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>{user.displayName ?? 'No Name'}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>View stats</EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink onClick={signOut}>Sign out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  )
}

export default HeaderUserMenu
