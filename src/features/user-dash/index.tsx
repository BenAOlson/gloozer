import React from 'react'
import { EuiPageBody, EuiPageContent, EuiPageContentBody } from '@elastic/eui'
import CreateParty from 'features/party/create-party'

type UserDashProps = {
  //
}
const UserDash = ({}: UserDashProps) => {
  return (
    <EuiPageBody>
      <EuiPageContent horizontalPosition="center">
        <EuiPageContentBody>
          <CreateParty />
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  )
}

export default UserDash
