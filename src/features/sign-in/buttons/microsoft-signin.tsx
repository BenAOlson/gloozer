import firebase from 'firebase/app'
import React from 'react'
import { FaMicrosoft } from 'react-icons/fa'
import OauthSigninButton from '../oauth-signin-button'

const MircosoftSignin = () => {
  const provider = new firebase.auth.OAuthProvider('microsoft.com')
  provider.setCustomParameters({
    prompt: 'consent',
    // tenant: 'the tenant id provided by outlook',
  })

  return (
    <OauthSigninButton
      icon={FaMicrosoft}
      provider={provider}
      providerName="Github"
    >
      No one signs in with Microsoft
    </OauthSigninButton>
  )
}

export default MircosoftSignin
