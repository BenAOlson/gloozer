import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { EuiPage } from '@elastic/eui'
import SignIn from 'features/sign-in'
// import DemonstrativeStuff from 'features/demonstrative-stuff'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'
import UserDash from 'features/user-dash'
import EuiRouterLink from 'features/common/eui-router-link'

const App = () => {
  const user = useContext(UserContext)

  console.log('App rendered')

  if (user) {
    return (
      <AppCore>
        <Switch>
          <Route path="/test">
            <div>
              <EuiRouterLink to="/">dash</EuiRouterLink>
            </div>
          </Route>
          <Route path="/">
            <EuiRouterLink to="/test">test</EuiRouterLink>
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
