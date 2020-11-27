import React, { useContext } from 'react'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'

const App = () => {
  const user = useContext(UserContext)
  return (
    <>
      <Header />
      <EuiPage>{!user && <SignIn />}</EuiPage>
    </>
  )
}

export default App
