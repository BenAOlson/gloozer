import React from 'react'
import {
  EuiAvatar,
  EuiFlexGroup,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from '@elastic/eui'
import { User } from 'types'

type UserDashProps = {
  user: User
}
const UserDash = ({ user }: UserDashProps) => {
  if (user) {
    return (
      <EuiPageBody>
        <EuiPageContent horizontalPosition="center">
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Hello, {user.displayName}</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiFlexGroup justifyContent="center">
              <EuiAvatar
                size="xl"
                name={user.displayName}
                imageUrl={user.photoURL}
              />
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    )
  }

  return null
}

export default UserDash
