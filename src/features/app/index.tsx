import React, { useContext } from 'react'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
// import DemonstrativeStuff from 'features/demonstrative-stuff'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'
import UserDash from 'features/user-dash'

const App = () => {
  const user = useContext(UserContext)

  return (
    <>
      <Header />
      <EuiPage>
        {/* <UserDash /> */}
        {user ? <UserDash /> : <SignIn />}
        {/* <DemonstrativeStuff /> */}
      </EuiPage>
    </>
  )
}

export default App
