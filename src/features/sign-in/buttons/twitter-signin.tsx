import firebase from 'firebase/app'
import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import OauthSigninButton from '../oauth-signin-button'

const TwitterSignin = () => {
  const provider = new firebase.auth.TwitterAuthProvider()

  return (
    <OauthSigninButton
      icon={FaTwitter}
      provider={provider}
      providerName="Twitter"
    >
      Sign in with Misinformation
    </OauthSigninButton>
  )
}

export default TwitterSignin
