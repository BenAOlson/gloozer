import React from 'react'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
import DemonstrativeStuff from 'features/demonstrative-stuff'

const App = () => (
  <EuiPage>
    <SignIn />
    <DemonstrativeStuff />
  </EuiPage>
)

export default App
