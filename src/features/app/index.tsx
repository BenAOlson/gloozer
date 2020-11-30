import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
// import DemonstrativeStuff from 'features/demonstrative-stuff'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'
import UserDash from 'features/user-dash'
import PartyDash from 'features/party/party-dash'

const App = () => {
  const user = useContext(UserContext)

  console.log('App rendered')

  if (user) {
    return (
      <AppCore>
        <Switch>
          <Route path="/party/:partyId">
            <PartyDash user={user} />
          </Route>
          <Route path="/">
            <UserDash user={user} />
          </Route>
        </Switch>
      </AppCore>
    )
  }

  return (
    <AppCore>
      <Route path="/">
        <SignIn />
      </Route>
    </AppCore>
  )
}

export default App

type AppCoreProps = {
  children: React.ReactNode
}
const AppCore = ({ children }: AppCoreProps) => (
  <Router>
    <Header />
    <EuiPage>
      {children}
      {/* <DemonstrativeStuff /> */}
    </EuiPage>
  </Router>
)
