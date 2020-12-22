import React, { useContext } from 'react'
import firebase from 'firebase/app'
import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiButton,
  EuiSpacer,
  EuiPageBody,
} from '@elastic/eui'
import EmailSignin from './buttons/email-signin'
import { UserContext } from 'features/firebase/user-context'
import GoogleSignin from './buttons/google-signin'
import FacebookSignin from './buttons/facebook-signin'
// import MircosoftSignin from './buttons/microsoft-signin'
import GithubSignin from './buttons/github-signin'
import YahooSignin from './buttons/yahoo-signin'

const SignIn = () => {
  const user = useContext(UserContext)
  const auth = firebase.auth()

  const signOut = () => {
    auth.signOut()
  }

  return (
    <EuiPageBody>
      <EuiPageContent horizontalPosition="center" verticalPosition="center">
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h1>Sign in and/or up</h1>
            </EuiTitle>
            {user && (
              <EuiTitle>
                <h2>{user.displayName}</h2>
              </EuiTitle>
            )}
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          {user ? (
            <EuiButton color="primary" fill fullWidth onClick={signOut}>
              Sign out
            </EuiButton>
          ) : (
            <>
              <GoogleSignin />
              <EuiSpacer size="m" />
              <FacebookSignin />
              <EuiSpacer size="m" />
              {/* <MircosoftSignin />
              <EuiSpacer size="m" /> */}
              <YahooSignin />
              <EuiSpacer size="m" />
              <GithubSignin />
              <EuiSpacer size="m" />
              <EmailSignin />
            </>
          )}
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  )
}

export default SignIn
