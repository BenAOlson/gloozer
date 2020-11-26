import firebase from 'firebase/app'
import React from 'react'
import { EuiButton } from '@elastic/eui'
import { FaFacebookF } from 'react-icons/fa'
import useFirebaseProviderSignin from './use-firebase-provider-signin'

const FacebookSignin = () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  const signIn = useFirebaseProviderSignin()

  return (
    <EuiButton
      color="text"
      fill={false}
      fullWidth
      iconType={FaFacebookF}
      onClick={signIn(provider)}
    >
      Sign in with Zuckerbook
    </EuiButton>
  )
}

export default FacebookSignin
