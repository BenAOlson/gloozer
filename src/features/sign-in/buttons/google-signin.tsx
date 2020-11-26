import firebase from 'firebase/app'
import { EuiButton } from '@elastic/eui'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import useFirebaseProviderSignin from './use-firebase-provider-signin'

const GoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  const signIn = useFirebaseProviderSignin()

  return (
    <EuiButton
      color="text"
      fullWidth
      iconType={FaGoogle}
      onClick={signIn(provider)}
    >
      Sign in with Googs
    </EuiButton>
  )
}

export default GoogleSignin
