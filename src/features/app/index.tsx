import React, { useContext } from 'react'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
import DemonstrativeStuff from 'features/demonstrative-stuff'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'

const App = () => {
  const user = useContext(UserContext)

  return (
    <>
      <Header />
      <EuiPage>
        <EuiPage>{!user && <SignIn />}</EuiPage>
        <DemonstrativeStuff />
      </EuiPage>
    </>
  )
}

export default App
