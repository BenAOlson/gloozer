import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
// import DemonstrativeStuff from 'features/demonstrative-stuff'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'
import UserDash from 'features/user-dash'
import EuiRouterLink from 'features/common/eui-router-link'
import PartyDash from 'features/party/party-dash'

const App = () => {
  const user = useContext(UserContext)

  console.log('App rendered')

  if (user) {
    return (
      <AppCore>
        <Switch>
          <Route path="/party/:partyId">
            <PartyDash />
          </Route>
          <Route path="/">
            <UserDash />
          </Route>
        </Switch>
      </AppCore>
    )
  }

  return (
    <AppCore>
      <SignIn />
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
