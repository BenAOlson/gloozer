import firebase from 'firebase/app'
import React from 'react'
import { EuiButton } from '@elastic/eui'
import { FaMicrosoft } from 'react-icons/fa'
import useFirebaseProviderSignin from './use-firebase-provider-signin'

const MircosoftSignin = () => {
  const provider = new firebase.auth.OAuthProvider('microsoft.com')
  provider.setCustomParameters({
    prompt: 'consent',
    // tenant: 'the tenant id provided by outlook',
  })
  const signIn = useFirebaseProviderSignin()

  return (
    <EuiButton
      color="text"
      fill={false}
      fullWidth
      iconType={FaMicrosoft}
      onClick={signIn(provider)}
    >
      No one signs in with Microsoft
    </EuiButton>
  )
}

export default MircosoftSignin
