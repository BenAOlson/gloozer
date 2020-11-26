import firebase from 'firebase/app'
import React from 'react'
import { EuiButton } from '@elastic/eui'
import { SiYahoo } from 'react-icons/si'
import useFirebaseProviderSignin from './use-firebase-provider-signin'

const YahooSignin = () => {
  var provider = new firebase.auth.OAuthProvider('yahoo.com')
  const signIn = useFirebaseProviderSignin()

  return (
    <EuiButton
      color="text"
      fill={false}
      fullWidth
      iconType={SiYahoo}
      onClick={signIn(provider)}
    >
      Sign in with <span style={{ fontStyle: 'italic' }}>Ya-hooOOooOooo!</span>
    </EuiButton>
  )
}

export default YahooSignin
