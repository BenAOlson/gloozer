import firebase from 'firebase/app'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import OauthSigninButton from '../oauth-signin-button'

const GoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  return (
    <OauthSigninButton icon={FaGoogle} provider={provider} providerName="Googs">
      Sign in with Googs
    </OauthSigninButton>
  )
}

export default GoogleSignin
