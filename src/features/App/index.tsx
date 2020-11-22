import React, { useContext } from 'react'
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from '@elastic/eui'
import { FirebaseContext } from 'features/firebase'
import styled from 'styled-components'

const App = () => {
  const firebase = useContext(FirebaseContext)

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageContent horizontalPosition="center" verticalPosition="center">
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h1>{firebase.name}</h1>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}

export default App

const PageBody = styled(EuiPageContent)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
