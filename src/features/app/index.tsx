import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { EuiLoadingSpinner, EuiPage, EuiPageBody } from '@elastic/eui'
import SignIn from 'features/sign-in'
// import DemonstrativeStuff from 'features/demonstrative-stuff'
import Header from 'features/header'
import { UserContext } from 'features/firebase/user-context'
import UserDash from 'features/user-dash'
import Party from 'features/party'

const App = () => {
  const user = useContext(UserContext)

  console.log('App rendered')

  if (user) {
    return (
      <AppCore>
        <Switch>
          <Route path="/party/:partyId">
            <Party user={user} />
          </Route>
          <Route path="/" exact>
            <UserDash user={user} />
          </Route>
          <Route>
            <div>404 baby</div>
          </Route>
        </Switch>
      </AppCore>
    )
  }

  if (user === null) {
    return (
      <AppCore>
        <Route path="/">
          <SignIn />
        </Route>
      </AppCore>
    )
  }

  return (
    <AppCore>
      <EuiPageBody>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EuiLoadingSpinner size="xl" />
        </div>
      </EuiPageBody>
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
